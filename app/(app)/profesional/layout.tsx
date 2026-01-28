export default function ProfesionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-blackPrimary text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blackSecondary border-r border-gold/20 p-6">
        <h2 className="text-xl font-bold text-gold mb-8">AVE Builders</h2>

        <nav className="space-y-4 text-sm">
          <a href="/profesional" className="block hover:text-gold">
            Dashboard
          </a>
          <a href="/profesional/leads" className="block hover:text-gold">
            Leads
          </a>
          <a href="/profesional/proyectos" className="block hover:text-gold">
            Proyectos
          </a>
          <a href="/profesional/clientes" className="block hover:text-gold">
            Clientes
          </a>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
