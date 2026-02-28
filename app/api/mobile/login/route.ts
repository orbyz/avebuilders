import { NextResponse } from "next/server";
import { mobileLogin } from "@/lib/auth/mobile-auth.service";

export async function POST(req: Request) {
  console.log("DB URI:", process.env.MONGODB_URI);
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 },
      );
    }

    const result = await mobileLogin(email, password);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
