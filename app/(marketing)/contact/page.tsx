"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!form.name || !form.email || !form.service) {
      alert("Por favor completa los campos obligatorios");
      setStatus("idle");
      return;
    }
    // Quitar antes de Deploy
    console.log("Enviando lead:", form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("No se pudo enviar el formulario. Inténtalo más tarde.");
      setStatus("idle");
    }
  };

  return (
    <main className="bg-black pt-11 text-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
        <p className="text-grayText max-w-2xl mx-auto">
          Cuéntanos qué necesitas y te ayudamos a darle forma a tu proyecto.
          Respuesta rápida y sin compromiso.
        </p>
      </section>

      {/* FORM */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        {status === "success" ? (
          <div className="bg-blackSecondary border border-gold/20 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">Solicitud enviada</h2>
            <p className="text-grayText">
              Hemos recibido tu mensaje. Nos pondremos en contacto contigo lo
              antes posible.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-blackSecondary border border-gold/20 rounded-2xl p-10 space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-blackPrimary border border-gray-700 rounded-lg px-4 py-3 text-white"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-blackPrimary border border-gray-700 rounded-lg px-4 py-3 text-white"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-blackPrimary border border-gray-700 rounded-lg px-4 py-3 text-white"
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full bg-blackPrimary border border-gray-700 rounded-lg px-4 py-3 text-white"
            >
              <option value="">Tipo de servicio</option>
              <option value="Reforma integral">Reforma integral</option>
              <option value="Baño">Reforma de baño</option>
              <option value="Cocina">Reforma de cocina</option>
              <option value="Electricidad / Fontanería">
                Electricidad / Fontanería
              </option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>

            <textarea
              name="message"
              placeholder="Cuéntanos brevemente tu proyecto"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-blackPrimary border border-gray-700 rounded-lg px-4 py-3 text-white"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-brand-accent text-black font-semibold py-4 rounded-full hover:opacity-90 transition"
            >
              {status === "loading" ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>
        )}

        {/* TRUST */}
        <div className="mt-12 text-center text-sm text-grayText">
          Presupuesto claro · Respuesta rápida · Sin compromiso
        </div>
      </section>
    </main>
  );
}
