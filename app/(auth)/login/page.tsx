"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/profesional",
    });

    if (res?.error) {
      setError("Credenciales incorrectas");
      return;
    }

    // ✅ Redirección correcta tras login
    window.location.replace(res?.url || "/profesional");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blackPrimary text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-blackSecondary border border-goldPrimary p-10 rounded-2xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Acceso</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded bg-blackPrimary border border-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-6 px-4 py-3 rounded bg-blackPrimary border border-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gold text-black py-3 rounded-full font-semibold"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
