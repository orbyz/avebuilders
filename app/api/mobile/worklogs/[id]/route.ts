import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import "@/lib/modules/users/model";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.MOBILE_JWT_SECRET as string);

    const { id } = await context.params;

    const log = await WorkLog.findById(id);

    if (!log) {
      return NextResponse.json(
        { error: "Worklog no encontrado" },
        { status: 404 },
      );
    }

    // 🔥 NUEVA VALIDACIÓN CORRECTA
    const logs = await WorkLog.find({
      employee: log.employee,
      project: log.project,
      weekStart: log.weekStart,
    });

    const isClosed =
      logs.length > 0 && logs.every((l) => l.status === "closed");

    if (isClosed) {
      return NextResponse.json(
        { error: "Semana cerrada, no se puede modificar" },
        { status: 400 },
      );
    }

    await WorkLog.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE WORKLOG ERROR:", error);

    return NextResponse.json(
      { error: "Error eliminando día." },
      { status: 500 },
    );
  }
}
