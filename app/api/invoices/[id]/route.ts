import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Invoice from "@/lib/modules/finance/invoice.model";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const user = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await req.json();

    if (!["pending", "paid"].includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return NextResponse.json(
        { error: "Factura no encontrada" },
        { status: 404 },
      );
    }

    invoice.status = status;
    await invoice.save();

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error("INVOICE PATCH ERROR:", error);
    return NextResponse.json(
      { error: "Error actualizando factura" },
      { status: 500 },
    );
  }
}
