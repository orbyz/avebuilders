import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { can, rolePermissions, Role } from "./permissions";
import { requireAuth } from "./requireAuth";

function isRole(value: string): value is Role {
  return value in rolePermissions;
}

export async function requirePermission(permission: string) {
  const auth = await requireAuth();

  if ("error" in auth) {
    return auth;
  }

  const role = auth.user.role;

  if (!role || !isRole(role)) {
    return { error: "Invalid role", status: 403 };
  }

  if (!can(role, permission)) {
    return { error: "Forbidden", status: 403 };
  }

  return { session: auth.session };
}
