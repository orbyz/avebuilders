import mongoose from "mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { Advance } from "@/lib/modules/finance/advance.model";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import Invoice from "@/lib/models/Invoice";
import { Payment } from "@/lib/modules/payroll/payment.model";

export async function generatePayrollBatch(
  employeeId: string,
  start: Date,
  end: Date,
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validar que no exista ya un batch en esa semana
    const existing = await PayrollBatch.findOne({
      employee: employeeId,
      weekStart: start,
    }).session(session);

    if (existing) {
      throw new Error("Ya existe un cierre para esta semana.");
    }

    const logs = await WorkLog.find({
      employee: employeeId,
      date: { $gte: start, $lte: end },
      status: "open",
    }).session(session);

    if (!logs.length) {
      throw new Error("No hay días trabajados en este periodo.");
    }

    const advances = await Advance.find({
      employee: employeeId,
      date: { $gte: start, $lte: end },
      payrollBatch: null,
    }).session(session);

    const totalWorked = logs.reduce((acc, l) => acc + l.dailyRateSnapshot, 0);
    const totalAdvance = advances.reduce((acc, a) => acc + a.amount, 0);

    const netToPay = totalWorked - totalAdvance;

    if (netToPay < 0) {
      throw new Error("El neto es negativo. Revisar anticipos.");
    }
    const batch = await PayrollBatch.create(
      [
        {
          employee: employeeId,
          weekStart: start,
          weekEnd: end,
          totalWorked,
          totalAdvance,
          netToPay,
          paidAmount: 0,
          pendingAmount: netToPay,
          status: "generated",
        },
      ],
      { session },
    );

    await WorkLog.updateMany(
      { _id: { $in: logs.map((l) => l._id) } },
      { status: "closed", payrollBatch: batch[0]._id },
      { session },
    );

    await Advance.updateMany(
      { _id: { $in: advances.map((a) => a._id) } },
      { payrollBatch: batch[0]._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return batch[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

export async function registerPayment(
  batchId: string,
  amount: number,
  note?: string,
  session?: mongoose.ClientSession,
) {
  const ownSession = !session;

  if (!session) {
    session = await mongoose.startSession();
    session.startTransaction();
  }

  try {
    const batch = await PayrollBatch.findById(batchId).session(session);

    if (!batch) throw new Error("Payroll no encontrado.");

    if (batch.status === "paid") {
      throw new Error("Este payroll ya está pagado.");
    }

    // ✅ Validación crítica (evita sobrepago)
    if (batch.paidAmount + amount > batch.netToPay) {
      throw new Error("El pago excede el monto pendiente.");
    }

    // ✅ Crear registro de pago
    await Payment.create(
      [
        {
          payrollBatch: batchId,
          amount,
          note,
        },
      ],
      { session },
    );

    // ✅ Actualizar acumulados
    batch.paidAmount += amount;
    batch.pendingAmount = batch.netToPay - batch.paidAmount;

    // ✅ Estado derivado
    if (batch.pendingAmount === 0) {
      batch.status = "paid";
      batch.paidAt = new Date();
    } else {
      batch.status = "partial";
    }

    await batch.save({ session });

    if (ownSession) {
      await session.commitTransaction();
      session.endSession();
    }

    return batch;
  } catch (error) {
    if (ownSession && session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
}

export async function getPayrollWeeks() {
  const result = await PayrollBatch.aggregate([
    {
      $group: {
        _id: "$weekStart",

        weekStart: { $first: "$weekStart" },
        weekEnd: { $first: "$weekEnd" },

        totalEmployees: { $sum: 1 },
        totalNet: { $sum: "$netToPay" },
        totalPaid: { $sum: "$paidAmount" },

        statuses: { $push: "$status" },
      },
    },

    {
      $addFields: {
        status: {
          $cond: [
            { $in: ["partial", "$statuses"] },
            "partial",
            {
              $cond: [
                { $not: { $in: ["generated", "$statuses"] } },
                "paid",
                "generated",
              ],
            },
          ],
        },
      },
    },

    {
      $project: {
        _id: 0,
        weekStart: 1,
        weekEnd: 1,
        totalEmployees: 1,
        totalNet: 1,
        totalPaid: 1,
        status: 1,
      },
    },

    {
      $sort: { weekStart: -1 },
    },
  ]);

  return result;
}

export async function markPayrollAsPaid(batchId: string) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const batch = await PayrollBatch.findById(batchId).session(session);

    if (!batch) throw new Error("Payroll no encontrado.");
    if (batch.status === "paid")
      throw new Error("Ya está marcado como pagado.");

    // ✅ 1. Registrar pago TOTAL
    const amountToPay = batch.pendingAmount;

    if (amountToPay <= 0) {
      throw new Error("No hay monto pendiente.");
    }

    // 👇 IMPORTANTE: pasar session
    await registerPayment(batchId, amountToPay, undefined, session);

    // 🔁 Volvemos a cargar batch actualizado
    const updatedBatch = await PayrollBatch.findById(batchId)
      .session(session)
      .lean();

    // ✅ 2. Generar invoices (tu lógica actual)
    const logs = await WorkLog.find({
      payrollBatch: batch._id,
    }).session(session);

    const grouped: Record<string, number> = {};

    logs.forEach((log) => {
      const projectId = log.project.toString();
      if (!grouped[projectId]) grouped[projectId] = 0;
      grouped[projectId] += log.dailyRateSnapshot;
    });

    for (const projectId in grouped) {
      await Invoice.create(
        [
          {
            projectId,
            type: "expense",
            concept: `Payroll semana ${
              batch.weekStart.toISOString().split("T")[0]
            }`,
            amount: grouped[projectId],
            status: "paid",
          },
        ],
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return updatedBatch;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

export async function getPayrollWeekDetail(weekStart: string) {
  const startDate = new Date(weekStart);

  if (isNaN(startDate.getTime())) {
    throw new Error("Fecha inválida");
  }

  const result = await PayrollBatch.aggregate([
    {
      $match: {
        weekStart: {
          $gte: startDate,
          $lt: new Date(startDate.getTime() + 86400000),
        },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "employee",
        foreignField: "_id",
        as: "employeeData",
      },
    },

    {
      $unwind: "$employeeData",
    },

    {
      $project: {
        _id: 0,
        employeeId: "$employee",

        name: "$employeeData.name",

        totalWorked: 1,
        totalAdvance: 1,
        netToPay: 1,
        paidAmount: 1,
        pendingAmount: 1,
        status: 1,
      },
    },

    {
      $sort: {
        name: 1,
      },
    },
  ]);

  return result;
}
