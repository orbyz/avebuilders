import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/lib/modules/leads/model";
import Project from "@/lib/modules/projects/model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body = await req.json();

    // 🟢 Caso 1: Conversión desde Lead
    if (body.leadId) {
      const lead = await Lead.findById(body.leadId);

      if (!lead) {
        return NextResponse.json(
          { error: "Lead no encontrado" },
          { status: 404 },
        );
      }

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
    }

    // 🟢 Caso 2: Creación manual
    const { name, email, phone, service, location } = body;

    if (!name) {
      return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
    }

    const project = await Project.create({
      name,
      email,
      phone,
      service,
      location,
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("PROJECT CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Error creando proyecto" },
      { status: 500 },
    );
  }
}
