import { requireAuth } from "./requireAuth";
import { can } from "./permissions";

export async function requirePermission(permission: string) {
  const auth = await requireAuth();

  if ("error" in auth) {
    return auth; // devuelve 401 o 403
  }

  const role = auth.user.role;

  if (!can(role, permission)) {
    return { error: "Forbidden", status: 403 };
  }
  //  console.log("ROLE IN REQUIRE:", auth.user.role);
  //  console.log("PERMISSION ASKED:", permission);

  return auth;
}
