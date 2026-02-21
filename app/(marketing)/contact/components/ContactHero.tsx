"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative h-[85vh] min-h-[560px] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/contact-hero.jpg')",
        }}
      />

      {/* Overlay base */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Overlay superior (navbar + título) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl text-brand-accent md:text-5xl font-bold mb-6"
        >
          Hablemos de tu proyecto
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="text-brand-text text-lg max-w-2xl mx-auto"
        >
          Cuéntanos qué necesitas y te orientamos con una propuesta clara,
          realista y sin compromiso.
        </motion.p>
      </div>
    </section>
  );
}
