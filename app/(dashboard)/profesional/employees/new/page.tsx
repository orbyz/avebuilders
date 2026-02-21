"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEmployeePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    role: "",
    dailyRate: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        dailyRate: Number(form.dailyRate),
      }),
    });

    if (res.ok) {
      router.push("/profesional/employees");
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Nuevo Empleado</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Nombre completo"
          className="w-full border p-2 rounded"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="Rol"
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          placeholder="Costo diario"
          type="number"
          className="w-full border p-2 rounded"
          value={form.dailyRate}
          onChange={(e) => setForm({ ...form, dailyRate: e.target.value })}
        />

        <button className="px-4 py-2 bg-black text-white rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
