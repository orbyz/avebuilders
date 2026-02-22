import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import User from "@/lib/modules/users/model";

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

  const safe = JSON.parse(JSON.stringify(worklogs));

  return NextResponse.json(safe);
}
