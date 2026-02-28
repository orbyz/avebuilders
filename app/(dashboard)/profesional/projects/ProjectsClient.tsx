"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProjectsClient({ projects }: any) {
  const [filter, setFilter] = useState("todos");

  const filtered =
    filter === "todos"
      ? projects
      : projects.filter((p: any) => p.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Proyectos</h1>

        <div className="flex gap-3">
          <Link
            href="/profesional/projects/new"
            className="bg-brand-accent text-black px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            + Nuevo Proyecto
          </Link>

          <div className="flex gap-2">
            {["todos", "activo", "finalizado"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === f ? "bg-neutral-700" : "bg-neutral-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: any) {
  const statusStyles: any = {
    activo: "bg-green-500/20 text-green-400",
    finalizado: "bg-blue-500/20 text-blue-400",
    cancelado: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4 hover:border-neutral-700 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{project.name}</h3>
          <p className="text-sm text-gray-400">{project.email}</p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      {/* Resumen financiero */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Facturado</p>
          <p className="text-green-400 font-semibold">
            € {project.totalIncome.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Gastos</p>
          <p className="text-red-400 font-semibold">
            € {project.totalExpense.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Alerta vencidas */}
      {project.hasOverdue && (
        <div className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-md">
          ⚠ Facturas vencidas
        </div>
      )}

      <Link
        href={`/profesional/projects/${project._id}`}
        className="text-sm text-brand-accent hover:underline"
      >
        Ver proyecto →
      </Link>
    </div>
  );
}
