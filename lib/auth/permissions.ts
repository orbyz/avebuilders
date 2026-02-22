export type Role = "admin" | "empleado" | "cliente";

export const rolePermissions = {
  admin: [
    "manage_users",
    "manage_payroll",
    "manage_employees",
    "manage_projects",
    "manage_finance",
  ],
  empleado: ["view_projects", "view_payroll"],
  cliente: ["view_own_projects"],
};

export function can(role: Role, permission: string) {
  const permissions = rolePermissions[role];

  if (permissions.includes("*")) return true;

  return permissions.includes(permission);
}
