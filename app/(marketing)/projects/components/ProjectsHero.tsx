"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ProjectsHero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/projects-hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-grayText mb-6"
        >
          <Link
            href="/"
            className="text-brand-text hover:text-brand-accent transition"
          >
            Inicio
          </Link>
          <span className="mx-2 text-brand-text">/</span>
          <span className="text-brand-accent">Proyectos</span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl text-brand-accent"
        >
          Proyectos profesionales en construcción y reformas
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="text-grayText max-w-2xl text-lg text-white"
        >
          Ejecutamos proyectos con planificación, ejecución y control de
          calidad. Nuestro equipo está capacitado para manejar proyectos
          complejos y garantizar resultados satisfactorios.
        </motion.p>
      </div>
    </section>
  );
}
