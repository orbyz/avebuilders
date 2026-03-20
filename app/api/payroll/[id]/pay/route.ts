// app/api/mobile/payroll/pay/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import "@/lib/db/register.models";
import { registerPayment } from "@/lib/services/payroll.service";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const user = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await context.params;

    const { amount, note } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Monto inválido." }, { status: 400 });
    }

    const updatedBatch = await registerPayment(id, amount, note);

    return NextResponse.json({
      success: true,
      data: updatedBatch,
    });
  } catch (error: any) {
    console.error("PAYROLL PAYMENT ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Error registrando pago." },
      { status: 500 },
    );
  }
}
