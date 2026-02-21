"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GeneratePayrollButton({
  employeeId,
}: {
  employeeId: string;
}) {
  const router = useRouter();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!start || !end) {
      alert("Selecciona un rango de fechas.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/payroll/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        start,
        end,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Payroll generado correctamente.");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Error generando payroll.");
    }
  }

  return (
    <div className="bg-brand-bg p-6 rounded shadow space-y-4">
      <h2 className="font-semibold text-brand-text">Generar Payroll</h2>

      <div className="flex gap-4 text-brand-bg">
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-brand-accent text-brand-bg rounded"
      >
        {loading ? "Generando..." : "Generar Payroll"}
      </button>
    </div>
  );
}
