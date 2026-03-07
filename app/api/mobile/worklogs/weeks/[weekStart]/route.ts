import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";

import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import User from "@/lib/modules/users/model";
import Project from "@/lib/modules/projects/model";

export async function GET(
  req: NextRequest,
  context: { params: { weekStart: string } },
) {
  try {
    await connectDB();

    // 🔧 registrar modelos para mongoose
    User;
    Project;

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.MOBILE_JWT_SECRET as string);

    const { weekStart } = context.params;

    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const logs = await WorkLog.find({
      weekStart: start,
    })
      .populate("employee", "name")
      .populate("project", "name")
      .sort({ date: 1 })
      .lean();

    if (!logs.length) {
      return NextResponse.json(
        { error: "Semana no encontrada" },
        { status: 404 },
      );
    }

    const employee = logs[0].employee;
    const project = logs[0].project;

    const days = logs.map((log: any) => ({
      id: log._id,
      date: log.date,
      rate: log.dailyRateSnapshot,
      status: log.status,
    }));

    const total = logs.reduce(
      (sum: number, log: any) => sum + log.dailyRateSnapshot,
      0,
    );

    return NextResponse.json({
      employee,
      project,
      weekStart: start,
      days,
      total,
    });
  } catch (error) {
    console.error("MOBILE WEEK DETAIL ERROR:", error);

    return NextResponse.json(
      { error: "Error obteniendo semana." },
      { status: 500 },
    );
  }
}
