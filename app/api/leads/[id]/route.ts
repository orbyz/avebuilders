import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Lead from "@/lib/models/Lead";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();

    await connectDB();

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });

    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando lead" },
      { status: 500 },
    );
  }
}
