"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Briefcase, Euro } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfesionalDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-gray-400">Cargando...</p>;

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Centro de Control</h1>

      {/* KPIs principales */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Indicador de clientes nuevos */}
        <KpiCard
          icon={<Users size={22} />}
          label="Clientes Totales"
          value={data.leads.total}
        />
        {/* Indicador de proyectos nuevos */}
        <KpiCard
          icon={<Briefcase size={22} />}
          label="Proyectos Activos"
          value={data.projects.byStatus?.activo || 0}
        />
        {/* Indicador de candidatos nuevos */}
        <KpiCard
          icon={<Users size={22} />}
          label="Candidatos Nuevos"
          value={data.candidates.byStatus?.new || 0}
        />
      </div>

      {/* Estado detallado */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Indicador de Leads por estado */}
        <SectionCard title="Leads por estado" data={data.leads.byStatus} />
        {/* Indicador de Proyectos por estado */}
        <SectionCard
          title="Proyectos por estado"
          data={data.projects.byStatus}
        />
        {/* Indicador de Talento por estado */}
        <SectionCard
          title="Talento por estado"
          data={data.candidates.byStatus}
        />
      </div>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition"
    >
      <div className="flex items-center justify-between mb-4 text-gray-400">
        {icon}
      </div>
      <p className="text-sm text-gray-400">{label}</p>
      <p
        className={`text-3xl font-bold mt-2 ${
          value > 0 ? "text-yellow-400" : ""
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}

function SectionCard({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  return (
    <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {Object.entries(data || {}).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm text-gray-300">
            <span>{translateStatus(key)}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function translateStatus(key: string) {
  const map: Record<string, string> = {
    new: "Nuevo",
    reviewed: "Revisado",
    hired: "Contratado",
    activo: "Activo",
    finalizado: "Finalizado",
    nuevo: "Nuevo",
    convertido: "Convertido",
    contactado: "Contactado",
  };

  return map[key] || key;
}
