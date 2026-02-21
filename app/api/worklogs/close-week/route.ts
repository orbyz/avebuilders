import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { projectId, weekStart } = await req.json();

    console.log("BODY:", { projectId, weekStart });

    if (!projectId || !weekStart) {
      return NextResponse.json(
        { error: "Datos incompletos." },
        { status: 400 },
      );
    }

    const worklogs = await WorkLog.find({
      project: projectId,
      status: "open",
    });
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    if (!worklogs.length) {
      return NextResponse.json(
        { error: "No hay registros abiertos." },
        { status: 400 },
      );
    }

    // Agrupar por empleado
    const grouped: Record<string, any[]> = {};

    for (const log of worklogs) {
      const emp = log.employee.toString();
      if (!grouped[emp]) grouped[emp] = [];
      grouped[emp].push(log);
    }

    // Crear batch por empleado
    for (const employeeId in grouped) {
      const logs = grouped[employeeId];

      const totalWorked = logs.length;
      const totalAmount = logs.reduce((sum, l) => sum + l.dailyRateSnapshot, 0);

      await PayrollBatch.create({
        employee: employeeId,
        project: projectId,
        weekStart: start,
        weekEnd: end,
        totalWorked,
        totalAdvance: 0,
        netToPay: totalAmount,
        pendingAmount: totalAmount,
        status: "generated",
      });

      await WorkLog.updateMany(
        { _id: { $in: logs.map((l) => l._id) } },
        { status: "closed" },
      );
    }

    return NextResponse.json({ message: "Semana cerrada correctamente." });
  } catch (error) {
    console.error("Error cerrando semana:", error);
    return NextResponse.json(
      { error: "Error cerrando semana." },
      { status: 500 },
    );
  }
}
