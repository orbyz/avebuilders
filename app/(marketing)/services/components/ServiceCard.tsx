"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  lead: string;
  description: string;
  note: string;
}

export function ServiceCard({
  title,
  lead,
  description,
  note,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        bg-blackSecondary
        border border-goldPrimary/40
        rounded-2xl
        p-8
        transition
        hover:border-goldPrimary
        hover:-translate-y-1
        hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)]
      "
    >
      <h3 className="text-xl font-semibold mb-3 text-brand-accent">{title}</h3>
      <span className="inline-block w-2 h-2 bg-brand-accent rounded-full mr-2" />

      {/* Lead */}
      <p className="font-medium mb-4 text-white">{lead}</p>

      {/* Descripción */}
      <p className="text-grayText mb-5 leading-relaxed">{description}</p>

      {/* Nota */}
      <p className="text-sm text-grayText/80">{note}</p>
    </motion.div>
  );
}
