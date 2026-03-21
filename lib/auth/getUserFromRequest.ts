import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import { verifyMobileToken } from "./verifyMobileToken";
import { NextRequest } from "next/server";

export async function getUserFromRequest(req: NextRequest) {
  // 📱 Mobile
  const mobileUser = await verifyMobileToken(req);
  if (mobileUser) return mobileUser;

  // 🌐 Web
  const session = await getServerSession(authOptions);

  if (session?.user) return session.user;

  return null;
}
