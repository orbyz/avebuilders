"use client";

import { useState, useRef } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [loadedAt] = useState(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      company: formData.get("company"),
      loadedAt,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      formRef.current?.reset();
    } else {
      setError("No se pudo enviar el mensaje. Inténtalo más tarde.");
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <input
            name="name"
            required
            placeholder="Nombre"
            className="bg-blackSecondary border border-goldPrimary/30 rounded-xl px-4 py-3"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="bg-blackSecondary border border-goldPrimary/30 rounded-xl px-4 py-3"
          />
        </div>

        <input
          name="phone"
          placeholder="Teléfono (opcional)"
          className="bg-blackSecondary border border-goldPrimary/30 rounded-xl px-4 py-3"
        />

        <input type="hidden" name="service" value="Contacto general" />

        <textarea
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos brevemente tu proyecto"
          className="bg-blackSecondary border border-goldPrimary/30 rounded-xl px-4 py-3 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="
            self-start
            px-8
            py-4
            bg-brand-accent
            text-black
            font-semibold
            rounded-xl
            transition
            hover:scale-105
            disabled:opacity-50
          "
        >
          {loading ? "Enviando..." : "Enviar consulta"}
        </button>

        {success && (
          <p className="text-green-500">
            Mensaje enviado correctamente. Te contactaremos pronto.
          </p>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
}
