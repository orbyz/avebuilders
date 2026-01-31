import { ReactNode } from "react";
import Link from "next/link";

export default function ProfesionalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800">
        <div className="p-6 text-xl font-bold text-yellow-500">
          AVE Builders
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <Link
            href="/profesional"
            className="rounded px-3 py-2 hover:bg-zinc-800"
          >
            Dashboard
          </Link>

          <Link
            href="/profesional/leads"
            className="rounded px-3 py-2 hover:bg-zinc-800"
          >
            Leads
          </Link>

          <Link
            href="/profesional/projects"
            className="rounded px-3 py-2 hover:bg-zinc-800"
          >
            Proyectos
          </Link>

          <Link
            href="/profesional/profile"
            className="rounded px-3 py-2 hover:bg-zinc-800"
          >
            Perfil
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
