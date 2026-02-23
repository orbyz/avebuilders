import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await context.params;

  const logs = await WorkLog.find({
    project: id,
    status: "closed",
  }).lean();

  const totalLabour = logs.reduce(
    (sum, log) => sum + (log.dailyRateSnapshot || 0),
    0,
  );

  return NextResponse.json({ totalLabour });
}
