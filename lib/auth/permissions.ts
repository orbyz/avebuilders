export type Role = "admin" | "empleado" | "cliente";

export const rolePermissions: Record<Role, string[]> = {
  admin: ["*", "manage_users", "edit_project"],
  empleado: ["view_dashboard", "add_note"],
  cliente: ["view_own_project", "write_history", "approve_budget"],
};

export function can(role: Role, permission: string) {
  const permissions = rolePermissions[role];

  if (permissions.includes("*")) return true;

  return permissions.includes(permission);
}
