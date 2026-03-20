import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { verifyMobileToken } from "./verifyMobileToken";
import { NextRequest } from "next/server";

export async function getUserFromRequest(req: NextRequest) {
  // 🔹 1. Intentar JWT (mobile)
  const mobileUser = await verifyMobileToken(req);
  if (mobileUser) return mobileUser;

  // 🔹 2. Intentar sesión (web)
  const session = await getServerSession(authOptions);
  if (session?.user) return session.user;

  return null;
}
