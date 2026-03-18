import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";

import User from "@/lib/modules/users/model";
import Project from "@/lib/modules/projects/model";

import { getWeekWorklogs } from "@/lib/modules/worklogs/worklog.service";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ weekStart: string }> },
) {
  try {
    await connectDB();

    // 🔒 Registrar modelos (evita MissingSchemaError)
    User;
    Project;

    // 🔐 Auth
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.MOBILE_JWT_SECRET as string);

    // 📦 Params
    const { weekStart } = await context.params;

    const employeeId = req.nextUrl.searchParams.get("employeeId");

    if (!employeeId) {
      return NextResponse.json(
        { error: "employeeId requerido" },
        { status: 400 },
      );
    }

    // 🧠 LÓGICA CENTRALIZADA (service)
    const data = await getWeekWorklogs(employeeId, new Date(weekStart));

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("MOBILE WEEK DETAIL ERROR:", error);

    if (error.message === "Semana no encontrada") {
      return NextResponse.json(
        { error: "Semana no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Error obteniendo semana." },
      { status: 500 },
    );
  }
}
