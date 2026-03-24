import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 👉 opcional: filtrar por empleado si no es admin
    const filter = user.role === "admin" ? {} : { employee: user.id };

    const batches = await PayrollBatch.find(filter)
      .sort({ weekStart: -1 })
      .lean();

    return NextResponse.json(batches);
  } catch (error) {
    console.error("PAYROLL WEEKS ERROR:", error);

    return NextResponse.json(
      { error: "Error obteniendo semanas" },
      { status: 500 },
    );
  }
}
