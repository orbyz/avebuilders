"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ServicesCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center py-32 bg-blackSecondary"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Te asesoramos antes de empezar cualquier obra
      </h2>

      <p className="text-grayText max-w-xl mx-auto mb-10">
        Cuéntanos tu idea y analizamos tu proyecto sin compromiso, con una
        propuesta clara y realista.
      </p>

      <Link
        href="/contact"
        className="
          inline-block
          px-10
          py-4
          bg-brand-accent
          text-black
          font-semibold
          rounded-xl
          text-lg
          transition
          hover:scale-105
          hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]
        "
      >
        Solicitar asesoramiento
      </Link>
    </motion.section>
  );
}
