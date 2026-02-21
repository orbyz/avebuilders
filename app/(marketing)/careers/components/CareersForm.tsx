"use client";

import { useState, useRef } from "react";

export function CareersForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/careers", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      formRef.current?.reset();
    } else {
      setError("No se pudo enviar la candidatura. Inténtalo nuevamente.");
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Envíanos tu candidatura
        </h2>
        <p className="text-grayText max-w-2xl mx-auto">
          Buscamos profesionales en construcción, reformas e instalaciones
          técnicas. Si quieres formar parte de nuestro equipo, completa el
          siguiente formulario.
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid gap-6 bg-neutral-900 p-8 rounded-2xl shadow-xl"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="name"
            required
            placeholder="Nombre completo"
            className="bg-brand-text p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Correo electrónico"
            className="bg-brand-text p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="phone"
            placeholder="Teléfono"
            className="bg-brand-text p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            name="profession"
            required
            className="bg-brand-text p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Selecciona tu área profesional</option>
            <option value="Albañilería">Albañilería</option>
            <option value="Electricidad">Electricidad</option>
            <option value="Fontanería">Fontanería</option>
            <option value="Carpintería">Carpintería (Madera/Metalica)</option>
            <option value="Pintura">Pintura</option>
            <option value="Jefe de obra">Jefe de obra</option>
            <option value="Arquitectura / Ingeniería">
              Arquitectura / Ingeniería
            </option>
          </select>
        </div>

        <textarea
          name="experience"
          placeholder="Cuéntanos brevemente tu experiencia profesional"
          rows={4}
          className="bg-brand-text p-4 rounded-lg outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="bg-brand-text p-4 rounded-lg">
          <label className="block mb-2 text-sm text-gray-400">
            Adjunta tu CV (PDF, máximo 5MB)
          </label>
          <input
            type="file"
            name="cv"
            accept=".pdf"
            required
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-app-accent py-4 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Enviando candidatura..." : "Enviar candidatura"}
        </button>

        {success && (
          <div className="bg-green-900/60 border border-green-700 p-4 rounded-lg text-center text-brand-text">
            Hemos recibido tu candidatura correctamente. Nuestro equipo la
            revisará y te contactará si encajas con los perfiles buscados.
          </div>
        )}

        {error && (
          <div className="bg-red-900/60 border border-red-700 p-4 rounded-lg text-center text-brand-text">
            {error}
          </div>
        )}
      </form>
    </section>
  );
}
