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
    <section id="presupuesto" className="py-28 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-14">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              Solicita tu presupuesto
            </h2>
            <p className="text-slate-600 text-lg">
              Te contactamos en menos de 24 horas · Sin compromiso
            </p>
          </div>

          {success && (
            <p className="text-green-600 text-center mb-6 font-medium">
              ✅ Hemos recibido tu solicitud. Te contactaremos pronto.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-6">
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
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <select name="tipoReforma" required className="input">
                <option value="">Tipo de reforma</option>
                <option>Integral</option>
                <option>Baño</option>
                <option>Cocina</option>
                <option>Fontanería</option>
                <option>Mantenimiento</option>
              </select>

              <textarea
                name="descripcion"
                placeholder="Cuéntanos brevemente qué necesitas"
                className="input h-28 resize-none"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-brand-accent text-black font-semibold py-4 rounded-lg
                         hover:brightness-95 transition text-lg"
            >
              {loading ? "Enviando..." : "Solicitar presupuesto"}
            </button>

            <p className="text-xs text-slate-500 text-center">
              Atención personalizada · Presupuesto claro · Garantía incluida
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
