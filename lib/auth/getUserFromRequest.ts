import { auth } from "./auth";
import { verifyMobileToken } from "./verifyMobileToken";
import { NextRequest } from "next/server";

export async function getUserFromRequest(req: NextRequest) {
  // 📱 1. Mobile (JWT)
  try {
    const mobileUser = await verifyMobileToken(req);
    if (mobileUser) return mobileUser;
  } catch (_) {
    // ignoramos error → intentamos web
  }

  // 🌐 2. Web (NextAuth App Router)
  const session = await auth();

  if (session?.user) return session.user;

  return null;
}
