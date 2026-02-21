import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/lib/modules/leads/model";

/* ---------------- GET ---------------- */
export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(leads);
  } catch (error) {
    console.error("LEADS GET ERROR:", error);
    return NextResponse.json(
      { error: "Error al obtener leads" },
      { status: 500 },
    );
  }
}

/* ---------------- POST ---------------- */
export async function POST(req: Request) {
  try {
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
  } catch (error) {
    console.error("LEADS POST ERROR:", error);
    return NextResponse.json({ error: "Error al crear lead" }, { status: 500 });
  }
}
