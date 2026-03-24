import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import MaterialRequest from "@/lib/modules/material-request/material-request.model";
import Invoice from "@/lib/modules/finance/invoice.model";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";

export async function POST(
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

    const { realAmount, dueDate } = await req.json();

    const request = await MaterialRequest.findById(id);

    if (!request) {
      return NextResponse.json(
        { error: "Solicitud no encontrada" },
        { status: 404 },
      );
    }

    if (request.status !== "approved") {
      return NextResponse.json(
        { error: "Solo solicitudes aprobadas pueden convertirse" },
        { status: 400 },
      );
    }

    const invoice = await Invoice.create({
      projectId: request.projectId,
      type: "expense",
      concept: request.description,
      amount: realAmount,
      status: "pending",
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    request.status = "converted";
    request.convertedToInvoiceId = invoice._id;

    await request.save();

    return NextResponse.json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.error("CONVERT ERROR:", error);
    return NextResponse.json(
      { error: "Error convirtiendo solicitud" },
      { status: 500 },
    );
  }
}
