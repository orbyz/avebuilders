export default function ServicesPage() {
  return (
    <main className="bg-black text-white pt-24">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nuestros Servicios
        </h1>
        <p className="text-grayText max-w-2xl mx-auto">
          Ofrecemos soluciones completas en reformas, rehabilitación y
          mantenimiento, gestionadas con criterio técnico y planificación.
        </p>
      </section>

      {/* GRID SERVICIOS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Servicio */}
          <div className="border border-goldPrimary rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-brand-accent">
              Reformas integrales
            </h3>
            <p className="text-grayText mb-4">
              Gestión completa de reformas de viviendas y locales comerciales,
              coordinando todos los gremios para un resultado coherente y
              funcional.
            </p>
            <p className="text-sm text-grayText">
              Ideal para renovaciones totales o cambios de distribución.
            </p>
          </div>

          <div className="border border-goldPrimary rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-brand-accent">
              Reformas de baños
            </h3>
            <p className="text-grayText mb-4">
              Diseño y ejecución de baños modernos, funcionales y duraderos,
              cuidando instalaciones, acabados y tiempos de entrega.
            </p>
            <p className="text-sm text-grayText">
              Adaptado a espacios pequeños o renovaciones completas.
            </p>
          </div>

          <div className="border border-goldPrimary rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-brand-accent">
              Reformas de cocinas
            </h3>
            <p className="text-grayText mb-4">
              Reformamos cocinas priorizando ergonomía, funcionalidad y una
              correcta integración de instalaciones y mobiliario.
            </p>
            <p className="text-sm text-grayText">
              Desde actualizaciones parciales hasta reformas completas.
            </p>
          </div>

          <div className="border border-goldPrimary rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-brand-accent">
              Fontanería
            </h3>
            <p className="text-grayText mb-4">
              Instalaciones nuevas, renovaciones y adecuaciones según normativa,
              con enfoque en seguridad y eficiencia.
            </p>
            <p className="text-sm text-grayText">
              Servicio tanto para reformas como intervenciones puntuales.
            </p>
          </div>

          <div className="border border-goldPrimary rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-brand-accent">
              Mantenimiento general
            </h3>
            <p className="text-grayText mb-4">
              Mantenimiento correctivo y preventivo para viviendas, oficinas y
              locales, asegurando el buen estado de los espacios.
            </p>
            <p className="text-sm text-grayText">
              Ideal para propietarios, comunidades y negocios.
            </p>
          </div>
          <div className="border border-goldPrimary rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-brand-accent">
              Constucciones nuevas y estructuras
            </h3>
            <p className="text-grayText mb-4">
              Mantenimiento correctivo y preventivo para viviendas, oficinas y
              locales, asegurando el buen estado de los espacios.
            </p>
            <p className="text-sm text-grayText">
              Ideal para propietarios, comunidades y negocios.
            </p>
          </div>
        </div>
      </section>

      {/* METODO */}
      <section className="bg-blackSecondary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-brand-accent">
            Un enfoque profesional en cada servicio
          </h2>
          <p className="text-grayText max-w-3xl mx-auto">
            Cada proyecto se gestiona con una metodología clara: análisis
            inicial, planificación detallada y ejecución controlada. Esto nos
            permite ofrecer resultados fiables, evitar imprevistos y cumplir los
            plazos acordados.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-brand-accent">
          Solicita tu presupuesto
        </h2>
        <p className="text-grayText mb-8">
          Cuéntanos qué necesitas y te asesoramos sin compromiso.
        </p>
        <a
          href="/contact"
          className="px-9 w-full bg-brand-accent text-black font-semibold py-4 rounded-lg
                     hover:brightness-95 transition text-lg"
        >
          Contactar
        </a>
      </section>
    </main>
  );
}
