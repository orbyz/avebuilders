import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { projectId, featured } = await req.json();

    await Project.findByIdAndUpdate(projectId, {
      featured,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("FEATURE UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Error actualizando estado público" },
      { status: 500 },
    );
  }
}
