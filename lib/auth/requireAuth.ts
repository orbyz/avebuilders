import connectDB from "@/lib/db/mongoose";
import User from "@/lib/modules/users/model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized", status: 401 };
  }

  await connectDB();

  const dbUser = await User.findById(session.user.id).select("isActive role");

  if (!dbUser || !dbUser.isActive) {
    return { error: "User inactive", status: 403 };
  }

  return { session, user: dbUser };
}
