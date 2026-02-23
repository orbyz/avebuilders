import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await context.params;

  const worklogs = await WorkLog.find({ project: id })
    .populate("employee", "name email")
    .sort({ date: -1 })
    .lean();

  // 🔒 Filtrar referencias rotas
  const safeLogs = worklogs
    .filter((log) => log.employee)
    .map((log) => ({
      ...log,
      _id: log._id.toString(),
      employee: {
        ...log.employee,
        _id: log.employee._id.toString(),
      },
      weekStart: log.weekStart ? new Date(log.weekStart).toISOString() : null,
      date: log.date ? new Date(log.date).toISOString() : null,
    }));

  return NextResponse.json(safeLogs);
}
