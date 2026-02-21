import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find({
      status: "finalizado",
      coverImage: { $exists: true, $ne: "" },
    })
      .select("name location coverImage year featured")
      .sort({ year: -1 })
      .lean();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("PUBLIC PROJECTS ERROR:", error);
    return NextResponse.json(
      { error: "Error cargando proyectos" },
      { status: 500 },
    );
  }
}
