import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import { Payment } from "@/lib/modules/payroll/payment.model";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const { amount, note } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Monto inválido." }, { status: 400 });
    }

    const batch = await PayrollBatch.findById(id);

    if (amount > batch.pendingAmount) {
      return NextResponse.json(
        { error: "El monto supera el saldo pendiente." },
        { status: 400 },
      );
    }
    if (!batch) {
      return NextResponse.json(
        { error: "Nómina no encontrada." },
        { status: 404 },
      );
    }

    batch.paidAmount += amount;
    batch.pendingAmount = batch.netToPay - batch.paidAmount;

    if (batch.pendingAmount <= 0) {
      batch.status = "paid";
      batch.pendingAmount = 0;
    } else {
      batch.status = "partial";
    }

    await batch.save();

    await Payment.create({
      payrollBatch: batch._id,
      amount,
      note,
    });

    return NextResponse.json(batch);
  } catch (error) {
    console.error("Error registrando pago:", error);
    return NextResponse.json(
      { error: "Error registrando pago." },
      { status: 500 },
    );
  }
}
