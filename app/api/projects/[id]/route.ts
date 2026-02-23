import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import { requirePermission } from "@/lib/auth/requirePermission";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requirePermission("manage_projects");

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const project = await Project.findByIdAndUpdate(id, body, { new: true });

  if (!project) {
    return NextResponse.json(
      { error: "Proyecto no encontrado" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
