import { connectDB } from "@/app/lib/db";
import Lead from "@/app/lib/models/Lead";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const lead = await Lead.create(data);

  return NextResponse.json({ success: true, lead });
}
