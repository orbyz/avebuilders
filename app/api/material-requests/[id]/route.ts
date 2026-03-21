import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import MaterialRequest from "@/lib/modules/material-request/material-request.model";
import { getUserFromRequest } from "@/lib/auth/getUserFromRequest";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const user = await getUserFromRequest(req);

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { status, adminComment } = body;

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const request = await MaterialRequest.findById(id);

    if (!request) {
      return NextResponse.json(
        { error: "Solicitud no encontrada" },
        { status: 404 },
      );
    }

    if (request.status !== "pending") {
      return NextResponse.json(
        { error: "Solo solicitudes pendientes pueden actualizarse" },
        { status: 400 },
      );
    }

    request.status = status;
    request.adminComment = adminComment;
    request.approvedBy = user.id;

    await request.save();

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error("APPROVE ERROR:", error);
    return NextResponse.json(
      { error: "Error actualizando solicitud" },
      { status: 500 },
    );
  }
}
