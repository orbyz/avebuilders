import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { can, rolePermissions, Role } from "./permissions";

function isRole(value: string): value is Role {
  return value in rolePermissions;
}

export async function requirePermission(permission: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized", status: 401 };
  }

  const role = session.user.role;

  if (!role || !isRole(role)) {
    return { error: "Invalid role", status: 403 };
  }

  if (!can(role, permission)) {
    return { error: "Forbidden", status: 403 };
  }

  return { session };
}
