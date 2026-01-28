export default function ClientDashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Resumen del proyecto</h1>

      <div className="border border-gold/20 rounded-2xl p-8">
        <p className="text-grayText mb-2">Estado actual</p>
        <p className="text-xl font-semibold text-gold">En planificación</p>

        <p className="text-grayText mt-4">
          Próxima fase: definición de alcance y presupuesto.
        </p>
      </div>
    </>
  );
}
