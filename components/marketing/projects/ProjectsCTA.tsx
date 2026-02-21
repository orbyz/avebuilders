import Link from "next/link";

export default function ProjectsCTA() {
  return (
    <section className="bg-brand-bg py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-3xl text-app-accent font-bold mb-6">
          ¿Quieres desarrollar un proyecto similar?
        </h3>

        <p className="text-brand-text mb-10">
          Cuéntanos tu idea y nuestro equipo técnico te asesorará desde la
          planificación hasta la ejecución final.
        </p>

        <Link
          href="/contact"
          className="bg-brand-accent text-black px-10 py-4 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Solicitar asesoramiento
        </Link>
      </div>
    </section>
  );
}
