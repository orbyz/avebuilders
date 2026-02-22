import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/modules/users/model";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 };
  }

  await connectDB();

  const user = await User.findById(session.user.id)
    .select("isActive role")
    .lean();

  if (!user || !user.isActive) {
    return { error: "Unauthorized", status: 401 };
  }

  return { session, user };
}
