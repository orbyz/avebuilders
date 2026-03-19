import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";
import { getWeekStart } from "@/lib/utils/date.utils"; // 🔥 IMPORTANTE
import "@/lib/modules/user/user.model";

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

    // 🔐 Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.MOBILE_JWT_SECRET as string,
    ) as { id: string; role: string };

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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

    // 🔥 NORMALIZAR SEMANA (CLAVE ABSOLUTA)
    const monday = getWeekStart(new Date(weekStart));

    // 🔥 VALIDACIÓN CORRECTA (incluye project)
    const existing = await WorkLog.findOne({
      employee: employeeId,
      project: projectId,
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
      date.setHours(0, 0, 0, 0); // 🔥 evitar problemas de timezone

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

    return NextResponse.json(created);
  } catch (error) {
    console.error("MOBILE GENERATE WEEK ERROR:", error);

    return NextResponse.json(
      { error: "Error generando semana." },
      { status: 500 },
    );
  }
}
