"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const linksByRole: Record<string, { href: string; label: string }[]> = {
  profesional: [
    { href: "/profesional", label: "Dashboard" },
    { href: "/profesional/leads", label: "Leads" },
    { href: "/profesional/projects", label: "Proyectos" },
  ],
  cliente: [{ href: "/cliente", label: "Mis proyectos" }],
  admin: [
    { href: "/admin", label: "Panel admin" },
    { href: "/admin/users", label: "Usuarios" },
  ],
};
export default function AppSidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const pathname = usePathname();
  const links = linksByRole[role || "profesional"] || [];

  return (
    <aside className="w-64 border-r border-app-border bg-app-surface p-4">
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
