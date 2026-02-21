import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import { requirePermission } from "@/lib/auth/requirePermission";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requirePermission("add_note");

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { session } = auth;
  const { id } = await params;

  const { message } = await req.json();
  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
  }

  await connectDB();

  const result = await Project.updateOne(
    { _id: id },
    {
      $push: {
        timeline: {
          type: "note",
          message,
          createdBy: {
            userId: session.user.id,
            role: session.user.role,
          },
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
