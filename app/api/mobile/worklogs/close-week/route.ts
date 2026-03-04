import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import jwt from "jsonwebtoken";
import { generatePayrollBatch } from "@/lib/services/payroll.service";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

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

    const { employeeId, weekStart } = await req.json();

    if (!employeeId || !weekStart) {
      return NextResponse.json(
        { error: "Datos incompletos." },
        { status: 400 },
      );
    }

    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const batch = await generatePayrollBatch(employeeId, start, end);

    return NextResponse.json(batch);
  } catch (error: any) {
    console.error("MOBILE CLOSE WEEK ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Error cerrando semana." },
      { status: 400 },
    );
  }
}
