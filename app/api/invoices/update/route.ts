import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Invoice from "@/lib/modules/finance/invoice.model";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    await Invoice.findByIdAndUpdate(id, { status });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("INVOICE UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Error actualizando factura" },
      { status: 500 },
    );
  }
}
