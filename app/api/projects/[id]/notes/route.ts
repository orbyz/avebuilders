import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "profesional") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();
  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
  }

  await connectDB();
  console.log("PROJECT SCHEMA PATHS:", Object.keys(Project.schema.paths));
  const result = await Project.updateOne(
    { _id: id },
    {
      $push: {
        timeline: {
          type: "note",
          message,
          createdBy: "profesional",
          createdAt: new Date(),
        },
      },
    },
  );

  if (result.matchedCount === 0) {
    return NextResponse.json(
      { error: "Proyecto no encontrado" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
