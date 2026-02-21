import mongoose from "mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { Advance } from "@/lib/modules/finance/advance.model";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import Invoice from "@/lib/models/Invoice";

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

    const totalWorked = logs.reduce((acc, l) => acc + l.dailyRate, 0);
    const totalAdvance = advances.reduce((acc, a) => acc + a.amount, 0);

    const batch = await PayrollBatch.create(
      [
        {
          employee: employeeId,
          weekStart: start,
          weekEnd: end,
          totalWorked,
          totalAdvance,
          netToPay: totalWorked - totalAdvance,
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

export async function markPayrollAsPaid(batchId: string) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const batch = await PayrollBatch.findById(batchId).session(session);

    if (!batch) throw new Error("Payroll no encontrado.");
    if (batch.status === "paid")
      throw new Error("Ya está marcado como pagado.");

    const logs = await WorkLog.find({
      payrollBatch: batch._id,
    }).session(session);

    const grouped: Record<string, number> = {};

    logs.forEach((log) => {
      const projectId = log.project.toString();
      if (!grouped[projectId]) grouped[projectId] = 0;
      grouped[projectId] += log.dailyRate;
    });

    for (const projectId in grouped) {
      await Invoice.create(
        [
          {
            projectId,
            type: "expense",
            concept: `Payroll semana ${batch.weekStart.toISOString().split("T")[0]}`,
            amount: grouped[projectId],
            status: "paid",
          },
        ],
        { session },
      );
    }

    batch.status = "paid";
    batch.paidAt = new Date();
    await batch.save({ session });

    await session.commitTransaction();
    session.endSession();

    return batch;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
