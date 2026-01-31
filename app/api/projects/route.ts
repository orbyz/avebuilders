import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Project from "@/lib/models/Project";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo proyectos" },
      { status: 500 },
    );
  }
}
