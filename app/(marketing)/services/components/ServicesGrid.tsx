"use client";

import { motion } from "framer-motion";
import { services } from "../data/services";
import { ServiceCard } from "./ServiceCard";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function ServicesGrid() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24">
      {/* Transición visual desde el HERO */}
      <div className="absolute -top-20 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent" />

      {/* Título de sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Conoce nuestros servicios
        </h2>
        <div className="w-32 h-1 bg-brand-accent mx-auto mb-6 rounded-full" />
        <p className="text-grayText max-w-2xl mx-auto">
          Ofrecemos servicios de construcción y reformas para viviendas y
          locales, adaptados a proyectos residenciales.
        </p>
      </motion.div>

      {/* Grid de servicios */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </motion.div>
    </section>
  );
}
