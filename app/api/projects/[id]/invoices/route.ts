import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Invoice from "@/lib/modules/finance/invoice.model";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const invoices = await Invoice.find({
      projectId: id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(invoices);
  } catch (error) {
    console.error("INVOICE LIST ERROR:", error);
    return NextResponse.json(
      { error: "Error cargando facturas" },
      { status: 500 },
    );
  }
}
