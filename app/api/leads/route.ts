import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Lead from "@/lib/models/Lead";

/* =========================
   GET → LISTAR LEADS
========================= */

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo leads" },
      { status: 500 },
    );
  }
}

/* =========================
   POST → CREAR LEAD
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const lead = await Lead.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      status: "nuevo",
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creando lead" }, { status: 500 });
  }
}
