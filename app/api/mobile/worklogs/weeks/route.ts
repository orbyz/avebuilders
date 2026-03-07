import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import User from "@/lib/modules/users/model";
import Project from "@/lib/modules/projects/model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    User;
    Project;

    // 🔐 Validar JWT móvil
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.MOBILE_JWT_SECRET as string,
    ) as { id: string; role: string };

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const logs = await WorkLog.find()
      .populate("employee", "name")
      .populate("project", "name")
      .sort({ weekStart: -1 })
      .lean();

    const weeksMap = new Map();

    logs.forEach((log: any) => {
      const key = `${log.employee._id}-${log.weekStart}`;

      if (!weeksMap.has(key)) {
        weeksMap.set(key, {
          employee: {
            id: log.employee._id,
            name: log.employee.name,
          },
          project: {
            id: log.project._id,
            name: log.project.name,
          },
          weekStart: log.weekStart,
          days: 0,
          total: 0,
          status: "open",
        });
      }

      const week = weeksMap.get(key);

      week.days += 1;
      week.total += log.dailyRateSnapshot;

      if (log.status === "closed") {
        week.status = "closed";
      }
    });

    const weeks = Array.from(weeksMap.values()).sort(
      (a: any, b: any) =>
        new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime(),
    );

    return NextResponse.json(weeks);
  } catch (error) {
    console.error("MOBILE WORKLOG WEEKS ERROR:", error);

    return NextResponse.json(
      { error: "Error obteniendo semanas." },
      { status: 500 },
    );
  }
}
