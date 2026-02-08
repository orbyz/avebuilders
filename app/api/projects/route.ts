import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Lead from "@/lib/models/Lead";
import Project from "@/lib/models/Project";

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();

    if (!leadId) {
      return NextResponse.json({ error: "leadId requerido" }, { status: 400 });
    }

    await connectDB();

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return NextResponse.json(
        { error: "Lead no encontrado" },
        { status: 404 },
      );
    }

    // 🔒 PROTECCIÓN CRÍTICA
    if (lead.status === "convertido") {
      return NextResponse.json(
        { error: "Este lead ya fue convertido" },
        { status: 409 },
      );
    }

    const project = await Project.create({
      leadId: lead._id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    });

    lead.status = "convertido";
    await lead.save();

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al convertir lead" },
      { status: 500 },
    );
  }
}
