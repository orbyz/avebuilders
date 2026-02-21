import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";

const dayMap: Record<string, number> = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4,
  sat: 5,
  sun: 6,
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { employeeId, projectId, weekStart, days } = await req.json();

    if (!employeeId || !projectId || !weekStart || !days?.length) {
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
        { error: "Empleado no válido." },
        { status: 404 },
      );
    }

    const monday = new Date(weekStart);

    // 🔒 Validar que no existan worklogs esa semana
    const existing = await WorkLog.findOne({
      employee: employeeId,
      weekStart: monday,
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ya existen registros para esa semana." },
        { status: 400 },
      );
    }

    const logsToCreate = days.map((day: string) => {
      const offset = dayMap[day];
      const date = new Date(monday);
      date.setDate(monday.getDate() + offset);

      return {
        employee: employeeId,
        project: projectId,
        date,
        weekStart: monday,
        dailyRateSnapshot: profile.dailyRate,
        status: "open",
      };
    });

    const created = await WorkLog.insertMany(logsToCreate);

    const populated = await WorkLog.find({
      _id: { $in: created.map((doc) => doc._id) },
    })
      .populate("employee", "name email")
      .sort({ date: -1 })
      .lean();

    return NextResponse.json(populated);
  } catch (error) {
    console.error("generate-week error:", error);

    return NextResponse.json(
      { error: "Error generando semana." },
      { status: 500 },
    );
  }
}
