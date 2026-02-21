import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Candidate from "@/lib/models/Candidate";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await connectDB();
    await Candidate.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE CANDIDATE ERROR:", error);
    return NextResponse.json(
      { error: "Error al eliminar candidato" },
      { status: 500 },
    );
  }
}
