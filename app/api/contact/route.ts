import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/lib/modules/leads/model";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, service, company, loadedAt } =
      await req.json();

    // -------------------
    // Anti-spam invisible
    // -------------------
    if (company) return NextResponse.json({ success: true });

    if (!loadedAt || Date.now() - loadedAt < 3000) {
      return NextResponse.json({ success: true });
    }

    // -------------------
    // Validación básica
    // -------------------
    if (!name || !email || !message || !service) {
      return NextResponse.json(
        { error: "Campos obligatorios faltantes" },
        { status: 400 },
      );
    }

    // -------------------
    // Guardar en Mongo
    // -------------------
    await connectDB();

    await Lead.create({
      name,
      email,
      phone,
      message,
      service,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Error al procesar el contacto" },
      { status: 500 },
    );
  }
}
