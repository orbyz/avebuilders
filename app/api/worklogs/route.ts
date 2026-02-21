import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { employeeId, projectId, date } = body;

    if (!employeeId || !projectId || !date) {
      return NextResponse.json(
        { error: "Datos incompletos." },
        { status: 400 },
      );
    }

    const profile = await EmployeeProfile.findOne({
      userId: employeeId,
      isActive: true,
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Empleado no válido o inactivo." },
        { status: 404 },
      );
    }

    const worklog = await WorkLog.create({
      employee: employeeId,
      project: projectId,
      date: new Date(date),
      dailyRateSnapshot: profile.dailyRate,
    });

    const populated = await worklog.populate("employee", "name email");

    return NextResponse.json(populated);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creando registro." },
      { status: 500 },
    );
  }
}
