import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Project from "@/lib/models/Project";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
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
