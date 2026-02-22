import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Advance } from "@/lib/modules/finance/advance.model";
import "@/lib/register-models";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const advance = await Advance.findById(id).populate(
      "employee",
      "fullName role",
    );

    if (!advance) {
      return NextResponse.json(
        { error: "Anticipo no encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(advance);
  } catch (error) {
    console.error("GET advance error:", error);

    return NextResponse.json(
      { error: "Error obteniendo anticipo." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    const updated = await Advance.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Anticipo no encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH advance error:", error);

    return NextResponse.json(
      { error: "Error actualizando anticipo." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const deleted = await Advance.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Anticipo no encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Anticipo eliminado correctamente.",
    });
  } catch (error) {
    console.error("DELETE advance error:", error);

    return NextResponse.json(
      { error: "Error eliminando anticipo." },
      { status: 500 },
    );
  }
}
