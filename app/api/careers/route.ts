import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Candidate from "@/lib/models/Candidate";
import cloudinary from "@/lib/shared/cloudinary";

export const runtime = "nodejs";
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const profession = formData.get("profession") as string;
    const experience = formData.get("experience") as string;
    const file = formData.get("cv") as File;

    if (!name || !email || !profession || !file) {
      return NextResponse.json(
        { error: "Campos obligatorios faltantes" },
        { status: 400 },
      );
    }

    // Validar PDF
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Solo se permiten archivos PDF" },
        { status: 400 },
      );
    }

    // Limitar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "El archivo supera el tamaño máximo permitido (5MB)" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ave-builders/cvs",
          resource_type: "raw",
          public_id: `cv_${Date.now()}`,
        },
        (error, result) => {
          if (error) {
            console.error("CLOUDINARY ERROR:", error);
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(buffer);
    });

    await connectDB();

    await Candidate.create({
      name,
      email,
      phone,
      profession,
      experience,
      cvUrl: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CAREERS ERROR:", error);
    return NextResponse.json(
      { error: "Error al procesar la candidatura" },
      { status: 500 },
    );
  }
}
