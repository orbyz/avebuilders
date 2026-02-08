import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  await connectDB();

  await User.findOneAndUpdate(
    { email: session.user.email },
    { professionalProfile: data },
  );

  return NextResponse.json({ success: true });
}
