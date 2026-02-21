import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { projectId, category, imageUrl } = await req.json();

    await Project.findByIdAndUpdate(projectId, {
      $pull: {
        [`gallery.${category}`]: imageUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GALLERY REMOVE ERROR:", error);
    return NextResponse.json(
      { error: "Error eliminando imagen" },
      { status: 500 },
    );
  }
}
