import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Candidate from "@/lib/models/Candidate";

export async function GET() {
  try {
    await connectDB();

    const candidates = await Candidate.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("CANDIDATES LIST ERROR:", error);
    return NextResponse.json(
      { error: "Error al obtener candidatos" },
      { status: 500 },
    );
  }
}
