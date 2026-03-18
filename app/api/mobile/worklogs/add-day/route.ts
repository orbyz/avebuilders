import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";

import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";

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

    const existing = await WorkLog.findOne({
      employee: employeeId,
      date: {
        $gte: targetDate,
        $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000),
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

    const log = await WorkLog.create({
      employee: employeeId,
      project: projectId,
      date: new Date(date),
      weekStart: new Date(weekStart),
      dailyRateSnapshot: profile.dailyRate,
      status: "open",
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("ADD DAY ERROR:", error);

    return NextResponse.json({ error: "Error creando día" }, { status: 500 });
  }
}
