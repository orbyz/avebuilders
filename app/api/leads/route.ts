import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Lead from "@/lib/models/Lead";

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();

  const lead = await Lead.create({
    name: body.nombre,
    email: body.email,
    phone: body.telefono,
    service: body.tipoReforma,
    message: body.descripcion,
  });

  return NextResponse.json({ success: true, lead });
}
