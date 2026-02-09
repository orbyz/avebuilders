"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Análisis del proyecto",
    description:
      "Escuchamos tus necesidades, evaluamos el espacio y analizamos la viabilidad técnica del proyecto.",
  },
  {
    step: "02",
    title: "Propuesta y presupuesto",
    description:
      "Definimos una solución técnica clara con presupuesto detallado, plazos y alcance del trabajo.",
  },
  {
    step: "03",
    title: "Ejecución y control",
    description:
      "Coordinamos todos los trabajos, supervisamos la obra y controlamos calidad, tiempos y seguridad.",
  },
  {
    step: "04",
    title: "Entrega y seguimiento",
    description:
      "Entregamos el proyecto terminado y realizamos seguimiento para asegurar tu satisfacción.",
  },
];

export function ServicesProcess() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo trabajamos</h2>
        <p className="text-grayText max-w-2xl mx-auto">
          Un proceso claro y estructurado para garantizar resultados de calidad
          y una ejecución sin sorpresas.
        </p>
      </motion.div>

      {/* Pasos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="
              bg-blackSecondary
              border border-goldPrimary/30
              rounded-2xl
              p-8
            "
          >
            <span className="text-brand-accent font-bold text-sm">
              {item.step}
            </span>

            <h3 className="text-lg font-semibold mt-3 mb-3">{item.title}</h3>

            <p className="text-grayText text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
