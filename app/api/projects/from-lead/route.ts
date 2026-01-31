import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Lead from "@/lib/models/Lead";
import Project from "@/lib/models/Project";

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();
    await connectDB();

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return NextResponse.json(
        { error: "Lead no encontrado" },
        { status: 404 },
      );
    }

    const project = await Project.create({
      title: `Proyecto - ${lead.name}`,
      clientName: lead.name,
      clientEmail: lead.email,
      service: lead.service,
      description: lead.message,
      leadId: lead._id,
    });

    lead.status = "cerrado";
    await lead.save();

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo convertir el lead" },
      { status: 500 },
    );
  }
}
