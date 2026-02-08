import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import Lead from "@/lib/models/Lead";

export async function POST(req: NextRequest) {
  await connectDB();

  const { leadId } = await req.json();

  const lead = await Lead.findById(leadId);
  if (!lead) {
    return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
  }

  const project = await Project.create({
    name: `Proyecto - ${lead.name}`,
    leadId: lead._id,
    email: lead.email,
    phone: lead.phone,
    service: lead.service,
    timeline: [
      {
        type: "system",
        message: "Proyecto creado desde lead",
        createdBy: "sistema",
      },
    ],
  });

  // actualizar estado del lead
  lead.status = "convertido";
  await lead.save();

  return NextResponse.json({ success: true, project });
}
