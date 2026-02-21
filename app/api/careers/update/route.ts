import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Candidate from "@/lib/models/Candidate";

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    await connectDB();

    await Candidate.findByIdAndUpdate(id, { status });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE CANDIDATE ERROR:", error);
    return NextResponse.json(
      { error: "Error al actualizar estado" },
      { status: 500 },
    );
  }
}
