export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-blackPrimary text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blackSecondary border-r border-gold/20 p-6">
        <h2 className="text-xl font-bold text-gold mb-8">Mi Proyecto</h2>

        <nav className="space-y-4 text-sm">
          <a href="/cliente" className="block hover:text-gold">
            Resumen
          </a>
          <a href="/cliente/proyectos" className="block hover:text-gold">
            Estado de obra
          </a>
          <a href="/cliente/mensajes" className="block hover:text-gold">
            Mensajes
          </a>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
