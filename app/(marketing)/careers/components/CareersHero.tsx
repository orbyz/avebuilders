"use client";

import { motion } from "framer-motion";

export function CareersHero() {
  return (
    <section className="relative h-[85vh] min-h-[560px] flex items-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/careers-hero.jpg')",
        }}
      />

      {/* Overlay base */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Overlay superior (navbar legible) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl text-brand-accent md:text-5xl font-bold mb-6"
        >
          Construye tu futuro con nosotros
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="text-brand-text text-lg max-w-2xl mx-auto"
        >
          Buscamos profesionales comprometidos que quieran formar parte de
          proyectos de construcción y reforma con visión técnica y estándares de
          calidad.
        </motion.p>
      </div>
    </section>
  );
}
