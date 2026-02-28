"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        service,
        location,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(true);

      setTimeout(() => {
        router.push(`/profesional/projects/${data.project._id}`);
      }, 1200);
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Nuevo Proyecto</h1>

      {success && (
        <div className="bg-green-500/20 border border-green-500/40 text-green-400 px-4 py-2 rounded-md">
          Proyecto creado correctamente
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nombre del Proyecto" value={name} onChange={setName} />

        <Field label="Correo del Cliente" value={email} onChange={setEmail} />

        <Field label="Teléfono" value={phone} onChange={setPhone} />

        <Field label="Servicio" value={service} onChange={setService} />

        <Field label="Ubicación" value={location} onChange={setLocation} />

        <button
          type="submit"
          className="bg-brand-accent text-black px-6 py-2 rounded-md font-semibold"
        >
          Crear Proyecto
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-accent"
      />
    </div>
  );
}
