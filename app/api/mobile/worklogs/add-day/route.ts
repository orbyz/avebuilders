import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";

import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";
import { getWeekStart } from "@/lib/utils/date.utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.MOBILE_JWT_SECRET as string);

    const { employeeId, projectId, date, weekStart } = await req.json();

    if (!employeeId || !projectId || !date || !weekStart) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const normalizedWeekStart = getWeekStart(new Date(date));

    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    const existing = await WorkLog.findOne({
      employee: employeeId,
      project: projectId,
      weekStart: normalizedWeekStart,
      date: {
        $gte: targetDate,
        $lt: nextDay,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un día para esa fecha" },
        { status: 400 },
      );
    }

    const profile = await EmployeeProfile.findOne({
      userId: employeeId,
      isActive: true,
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Empleado sin perfil activo" },
        { status: 404 },
      );
    }

    // 🔒 BLOQUEO SI SEMANA CERRADA
    const existingLogs = await WorkLog.find({
      employee: employeeId,
      project: projectId,
      weekStart: normalizedWeekStart,
    });

    const isClosed =
      existingLogs.length > 0 &&
      existingLogs.every((log) => log.status === "closed");

    if (isClosed) {
      return NextResponse.json(
        { error: "Semana cerrada, no se puede modificar" },
        { status: 400 },
      );
    }

    const log = await WorkLog.create({
      employee: employeeId,
      project: projectId,
      date: targetDate,
      weekStart: normalizedWeekStart,
      dailyRateSnapshot: profile.dailyRate,
      status: "open",
    });

    return NextResponse.json(log);
  } catch (error: any) {
    console.error("ADD DAY ERROR FULL:", error);

    return NextResponse.json(
      {
        error: error.message || "Error creando día",
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
