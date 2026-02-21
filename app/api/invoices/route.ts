import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Invoice from "@/lib/modules/finance/invoice.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json(); // 👈 PRIMERO DECLARAR

    if (!body.projectId || !body.type || !body.concept || !body.amount) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const year = new Date().getFullYear();

    const lastInvoice = await Invoice.findOne({
      invoiceNumber: { $regex: `^INV-${year}-` },
    })
      .sort({ createdAt: -1 })
      .lean();

    let nextNumber = 1;

    if (lastInvoice?.invoiceNumber) {
      const lastSequence = parseInt(lastInvoice.invoiceNumber.split("-")[2]);
      nextNumber = lastSequence + 1;
    }

    const invoiceNumber = `INV-${year}-${String(nextNumber).padStart(4, "0")}`;

    const invoice = await Invoice.create({
      projectId: body.projectId,
      invoiceNumber,
      type: body.type,
      concept: body.concept,
      amount: Number(body.amount),
      status: body.status || "pending",
      dueDate: body.dueDate,
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("INVOICE CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Error creando factura" },
      { status: 500 },
    );
  }
}
