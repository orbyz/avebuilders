import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/modules/users/model";

export async function GET() {
  await connectDB();
  const users = await User.find().select("email role").lean();
  return NextResponse.json(users);
}
