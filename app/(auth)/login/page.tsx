"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); // ✅ dentro
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
    });

    if (res?.error) {
      setError("Credenciales incorrectas");
      return;
    }

    const session = await getSession();

    if (!session) {
      router.push("/");
      return;
    }

    const role = session.user.role;

    if (role === "admin" || role === "empleado") {
      router.push("/profesional");
    } else if (role === "cliente") {
      router.push("/cliente");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-brand-bg border border-brand-accent p-10 rounded-2xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Acceso</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded bg-brand-bg border border-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-6 px-4 py-3 rounded bg-brand-bg border border-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-brand-accent text-black py-3 rounded-full font-semibold"
        >
          Entrar
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}
      </form>
    </main>
  );
}
