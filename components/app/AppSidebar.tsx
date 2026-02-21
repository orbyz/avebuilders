"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/shared/utils";

const linksByRole: Record<
  "admin" | "empleado" | "cliente",
  { href: string; label: string }[]
> = {
  admin: [
    { href: "/profesional", label: "Dashboard" },
    { href: "/profesional/leads", label: "Contactos" },
    { href: "/profesional/projects", label: "Proyectos" },
    { href: "/profesional/careers", label: "Candidatos" },
    { href: "/profesional/employees", label: "Empleados" },
    { href: "/profesional/payroll", label: "Nómina" },
    { href: "/profesional/sistema/users", label: "Usuarios" },
  ],

  empleado: [
    { href: "/profesional", label: "Dashboard" },
    { href: "/profesional/projects", label: "Proyectos" },
  ],

  cliente: [{ href: "/cliente", label: "Mis proyectos" }],
};

export default function AppSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const role = session?.user?.role as
    | "admin"
    | "empleado"
    | "cliente"
    | undefined;

  if (!role) return null;

  const links = linksByRole[role] ?? [];

  return (
    <aside className="w-64 min-w-[16rem] max-w-[16rem] flex-shrink-0 border-r border-app-border bg-app-surface p-4 print:hidden">
      <nav className="space-y-1 text-sm">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2 transition-colors",
                active
                  ? "bg-app-surface2 text-app-accent"
                  : "text-app-muted hover:bg-app-surface2 hover:text-app-text",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
