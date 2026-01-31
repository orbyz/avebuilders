export default function ProfesionalDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-yellow-500 mb-4">
        Dashboard Profesional
      </h1>

      <p className="text-zinc-400 mb-8">
        Bienvenido a tu panel de gestión de proyectos y clientes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Leads nuevos</h2>
          <p className="text-3xl font-bold text-yellow-500">0</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Proyectos activos</h2>
          <p className="text-3xl font-bold text-yellow-500">0</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Proyectos finalizados</h2>
          <p className="text-3xl font-bold text-yellow-500">0</p>
        </div>
      </div>
    </div>
  );
}
