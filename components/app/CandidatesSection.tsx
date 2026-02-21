"use client";

import { useEffect, useState, useMemo } from "react";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  profession: string;
  status: string;
  cvUrl: string;
  createdAt: string;
}

export default function CandidatesSection() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "reviewed" | "hired">(
    "all",
  );

  useEffect(() => {
    fetch("/api/careers/list")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/careers/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setCandidates((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status } : c)),
    );
  }

  const filteredCandidates = useMemo(() => {
    if (filter === "all") return candidates;
    return candidates.filter((c) => c.status === filter);
  }, [candidates, filter]);

  const counts = useMemo(() => {
    return {
      total: candidates.length,
      new: candidates.filter((c) => c.status === "new").length,
      reviewed: candidates.filter((c) => c.status === "reviewed").length,
      hired: candidates.filter((c) => c.status === "hired").length,
    };
  }, [candidates]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-6">Gestión de Talento</h2>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="Total" value={counts.total} />
          <StatCard label="Nuevos" value={counts.new} />
          <StatCard label="Revisados" value={counts.reviewed} />
          <StatCard label="Contratados" value={counts.hired} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        {["all", "new", "reviewed", "hired"].map((value) => (
          <button
            key={value}
            onClick={() =>
              setFilter(value as "all" | "new" | "reviewed" | "hired")
            }
            className={`px-4 py-2 rounded-lg ${
              filter === value ? "bg-brand-accent text-black" : "bg-neutral-800"
            }`}
          >
            {value === "all"
              ? "Todos"
              : value === "new"
                ? "Nuevos"
                : value === "reviewed"
                  ? "Revisados"
                  : "Contratados"}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-neutral-900 p-6 rounded-xl flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{candidate.name}</h3>
              <p className="text-sm text-gray-400">{candidate.profession}</p>
              <p className="text-sm">{candidate.email}</p>
            </div>

            <div className="flex gap-4 items-center">
              <select
                value={candidate.status}
                onChange={(e) => updateStatus(candidate._id, e.target.value)}
                className="bg-neutral-800 px-3 py-2 rounded"
              >
                <option value="new">Nuevo</option>
                <option value="reviewed">Revisado</option>
                <option value="hired">Contratado</option>
              </select>

              <a
                href={candidate.cvUrl}
                target="_blank"
                className="bg-primary px-4 py-2 rounded-lg font-semibold"
              >
                Ver CV
              </a>
            </div>
          </div>
        ))}

        {filteredCandidates.length === 0 && (
          <p className="text-gray-500">No hay candidatos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl text-center">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
