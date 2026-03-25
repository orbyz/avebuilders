import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const user = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const batch = await PayrollBatch.findById(id).lean();

    if (!batch) {
      return NextResponse.json(
        { error: "Payroll no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(batch);
  } catch (error) {
    console.error("GET PAYROLL BY ID ERROR:", error);

    return NextResponse.json(
      { error: "Error obteniendo payroll" },
      { status: 500 },
    );
  }
}
