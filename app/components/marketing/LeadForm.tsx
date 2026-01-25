"use client";

import { useState } from "react";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSuccess(true);
    setLoading(false);
    e.currentTarget.reset();
  }

  return (
    <section id="presupuesto" className="py-24 px-6 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Solicita tu presupuesto
        </h2>

        {success && (
          <p className="text-green-400 text-center mb-6">
            Hemos recibido tu solicitud. Te contactaremos pronto.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre"
            required
            className="input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="input"
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            required
            className="input"
          />

          <select name="tipoReforma" required className="input">
            <option value="">Tipo de reforma</option>
            <option>Integral</option>
            <option>Baño</option>
            <option>Cocina</option>
            <option>Electricidad</option>
            <option>Fontanería</option>
            <option>Mantenimiento</option>
          </select>

          <textarea
            name="descripcion"
            placeholder="Cuéntanos brevemente qué necesitas"
            className="input h-28"
          />

          <button
            disabled={loading}
            className="w-full bg-goldPrimary text-gray-900 font-semibold py-4 rounded-lg hover:bg-yellow-300 transition"
          >
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      </div>
    </section>
  );
}
