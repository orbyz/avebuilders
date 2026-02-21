"use client";

const items = [
  "Respuesta clara y personalizada",
  "Análisis técnico inicial",
  "Presupuesto transparente",
  "Sin compromiso ni presión",
];

export function ContactExpectations() {
  return (
    <section className="max-w-5xl mx-auto px-6 mb-24 mt-24">
      <div className="bg-blackSecondary border border-goldPrimary/30 rounded-2xl p-10">
        <h2 className="text-2xl font-semibold mb-6">
          ¿Qué puedes esperar al escribirnos?
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 text-grayText">
          {items.map((item) => (
            <li key={item} className="flex items-center">
              <span className="w-2 h-2 bg-brand-accent rounded-full mr-3" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
