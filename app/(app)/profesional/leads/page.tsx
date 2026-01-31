"use client";

import { useEffect, useState } from "react";

/* =======================
   HELPERS (AQUÍ VAN)
======================= */

const statusStyles: Record<string, string> = {
  nuevo: "bg-yellow-500/10 text-yellow-400",
  contactado: "bg-blue-500/10 text-blue-400",
  en_proceso: "bg-orange-500/10 text-orange-400",
  cerrado: "bg-green-500/10 text-green-400",
};

const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  en_proceso: "En proceso",
  cerrado: "Cerrado",
};

const STATUSES = [
  "todos",
  "nuevo",
  "contactado",
  "en_proceso",
  "cerrado",
] as const;
type StatusFilter = (typeof STATUSES)[number];

/* =======================
   TYPES
======================= */
type Lead = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string; // 👈 ESTE FALTABA
  status: string;
  createdAt: string;
};

/* =======================
   COMPONENT
======================= */

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Cargar leads
  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedLead(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [filter, setFilter] = useState<StatusFilter>("todos");
  const [query, setQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const counts = leads.reduce(
    (acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const filteredLeads = leads.filter((l) => {
    const matchStatus = filter === "todos" ? true : l.status === filter;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  // 2️⃣  updateStatus
  async function updateStatus(id: string, status: string) {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
  }

  async function convertToProject(leadId: string) {
    const res = await fetch("/api/projects/from-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId }),
    });

    console.log("Status:", res.status);

    if (res.ok) {
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: "cerrado" } : l)),
      );
      setSelectedLead(null);
      alert("Proyecto creado correctamente");
    } else {
      alert("Error al crear el proyecto");
    }
  }

  if (loading) {
    return <p className="text-zinc-400">Cargando leads...</p>;
  }

  // 3️⃣ JSX
  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">
        Leads recibidos
      </h1>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1 text-sm border ${
              filter === s
                ? "bg-yellow-500 text-black border-yellow-500"
                : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {s === "todos" ? "Todos" : statusLabels[s]}
            {s !== "todos" && (
              <span className="ml-2 text-xs opacity-80">{counts[s] || 0}</span>
            )}
          </button>
        ))}

        <input
          type="search"
          placeholder="Buscar por nombre o email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="ml-auto rounded bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-800 rounded-lg">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Servicio</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-zinc-400">
                  No hay leads para este filtro.
                </td>
              </tr>
            )}
            {filteredLeads.map((lead) => (
              <tr
                key={lead._id}
                onClick={() => setSelectedLead(lead)}
                className="cursor-pointer border-t border-zinc-800 hover:bg-zinc-900"
              >
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.service || "-"}</td>

                {/* 4️⃣ Aquí SE USA updateStatus */}
                <td>
                  <select
                    value={lead.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                    className={`rounded px-3 py-1 text-sm ${statusStyles[lead.status]}`}
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="contactado">Contactado</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="cerrado">Cerrado</option>
                  </select>
                </td>

                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/60"
            onClick={() => setSelectedLead(null)}
          />

          {/* Panel */}
          <aside className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-yellow-500">
                Detalle del lead
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-zinc-400">Nombre</p>
                <p className="font-medium">{selectedLead.name}</p>
              </div>

              <div>
                <p className="text-zinc-400">Email</p>
                <p className="font-medium">{selectedLead.email}</p>
              </div>

              <div>
                <p className="text-zinc-400">Servicio</p>
                <p className="font-medium">{selectedLead.service || "—"}</p>
              </div>

              <div>
                <p className="text-zinc-400">Mensaje</p>
                <p className="bg-zinc-900 border border-zinc-800 rounded p-3">
                  {selectedLead.message || "—"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 mb-1">Estado</p>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    updateStatus(selectedLead._id, e.target.value);
                    setSelectedLead({
                      ...selectedLead,
                      status: e.target.value,
                    });
                  }}
                  className={`rounded px-3 py-1 text-sm ${statusStyles[selectedLead.status]}`}
                >
                  {Object.keys(statusLabels).map((key) => (
                    <option key={key} value={key}>
                      {statusLabels[key]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <p className="text-zinc-400">
                  Creado el {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* CTA futura */}
            <div className="mt-6">
              <button
                onClick={() => convertToProject(selectedLead._id)}
                className="w-full rounded bg-yellow-500 text-black py-2 hover:bg-yellow-400 transition"
              >
                Convertir en proyecto
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
