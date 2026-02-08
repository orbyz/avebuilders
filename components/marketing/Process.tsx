const steps = [
  "Contacto inicial",
  "Visita técnica",
  "Presupuesto cerrado",
  "Ejecución de la obra",
  "Entrega y garantía",
];

export default function Process() {
  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Cómo trabajamos
        </h2>

        <ol className="grid md:grid-cols-5 gap-6 text-center">
          {steps.map((step, index) => (
            <li key={step} className="bg-white p-6 rounded-xl shadow-sm">
              <span className="block text-goldPrimary font-bold text-xl mb-2">
                {index + 1}
              </span>
              <p className="font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
