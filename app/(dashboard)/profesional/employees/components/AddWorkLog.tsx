"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddWorkLog({
  employeeId,
  projects,
}: {
  employeeId: string;
  projects: { _id: string; name: string }[];
}) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");

  async function handleSubmit() {
    if (!date || !projectId) {
      alert("Selecciona fecha y proyecto.");
      return;
    }

    const res = await fetch("/api/worklogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        projectId,
        date,
      }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Error creando día trabajado.");
    }
  }

  return (
    <div className="bg-brand-bg p-6 rounded shadow space-y-4">
      <h2 className="font-semibold">Registrar día trabajado</h2>

      <div className="flex gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border text-brand-bg p-2 rounded"
        />

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="border text-brand-bg p-2 rounded"
        >
          <option value="">Seleccionar proyecto</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-app-accent text-brand-bg rounded"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
