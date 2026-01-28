export default function ProfessionalDashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard profesional</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gold/20 rounded-2xl p-6">
          <p className="text-grayText">Leads nuevos</p>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="border border-gold/20 rounded-2xl p-6">
          <p className="text-grayText">Proyectos activos</p>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>

        <div className="border border-gold/20 rounded-2xl p-6">
          <p className="text-grayText">Clientes</p>
          <p className="text-3xl font-bold mt-2">9</p>
        </div>
      </div>
    </>
  );
}
