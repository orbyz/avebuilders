"use client";

import { motion } from "framer-motion";

const trustItems = [
  {
    title: "Cumplimiento normativo",
    description:
      "Trabajamos bajo la normativa vigente y buenas prácticas del sector en cada proyecto.",
  },
  {
    title: "Control de calidad",
    description:
      "Supervisamos cada fase de la obra para garantizar acabados y ejecución técnica correcta.",
  },
  {
    title: "Gestión de plazos",
    description:
      "Planificación realista y seguimiento continuo para evitar retrasos innecesarios.",
  },
  {
    title: "Transparencia total",
    description:
      "Presupuestos claros, sin sorpresas ni costes ocultos durante la ejecución.",
  },
];

export function ServicesTrust() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Por qué confiar en AVE Builders
        </h2>
        <p className="text-grayText max-w-2xl mx-auto">
          Más allá de construir, gestionamos proyectos con criterio técnico,
          responsabilidad y compromiso.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {trustItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="
              bg-blackSecondary
              border border-goldPrimary/20
              rounded-2xl
              p-8
              text-center
            "
          >
            <h3 className="font-semibold mb-3">{item.title}</h3>
            <p className="text-sm text-grayText leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
