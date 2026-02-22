import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";
import User from "@/lib/modules/users/model";
import "@/lib/register-models";

export async function GET() {
  await connectDB();

  const employees = await EmployeeProfile.find()
    .populate("userId", "name email role isActive")
    .lean();

  return NextResponse.json(employees);
}
