"use client";

import { useEffect, useState, useMemo } from "react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function LeadsSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/leads/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
  }

  const filteredLeads = useMemo(() => {
    return leads
      .filter((l) => (filter === "all" ? true : l.status === filter))
      .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));
  }, [leads, filter, search]);

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Gestión de Leads</h2>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Total" value={counts.total} />
        <Stat label="Nuevos" value={counts.new} />
        <Stat label="Contactados" value={counts.contacted} />
        <Stat label="Cerrados" value={counts.closed} />
      </div>

      {/* Search + Filters */}
      <div className="flex justify-between items-center">
        <input
          placeholder="Buscar lead..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-neutral-800 px-4 py-2 rounded-lg"
        />

        <div className="flex gap-3">
          {["all", "new", "contacted", "closed"].map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg ${
                filter === value ? "bg-primary text-black" : "bg-neutral-800"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead._id}
            className="bg-neutral-900 p-6 rounded-xl flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{lead.name}</h3>
              <p className="text-sm text-gray-400">{lead.email}</p>
              <p className="text-sm mt-2">{lead.service}</p>
              <p className="text-sm mt-2">{lead.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(lead.createdAt).toLocaleDateString()}
              </p>
            </div>

            <select
              value={lead.status}
              onChange={(e) => updateStatus(lead._id, e.target.value)}
              className="bg-neutral-800 px-3 py-2 rounded"
            >
              <option value="new">Nuevo</option>
              <option value="contacted">Contactado</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>
        ))}

        {filteredLeads.length === 0 && (
          <p className="text-gray-500">No hay leads que coincidan.</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl text-center">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
