import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { projectId, category, imageUrl } = await req.json();

    // 1️⃣ Añadir imagen a la galería
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: {
          [`gallery.${category}`]: imageUrl,
        },
      },
      { new: true },
    );

    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 },
      );
    }

    // 2️⃣ Si es imagen final y no hay portada, asignarla automáticamente
    if (category === "after" && !project.coverImage) {
      project.coverImage = imageUrl;
      await project.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GALLERY UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Error actualizando galería" },
      { status: 500 },
    );
  }
}
