"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ServicesHero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/services-hero.jpg')",
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
          <Link href="/" className="hover:text-brand-accent transition">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Servicios</span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl text-brand-accent"
        >
          Construcción y reformas con gestión profesional
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="text-grayText max-w-2xl text-lg text-white"
        >
          Planificamos, ejecutamos y controlamos cada proyecto con criterios
          técnicos, cumplimiento de plazos y máxima transparencia.
        </motion.p>
      </div>
    </section>
  );
}
