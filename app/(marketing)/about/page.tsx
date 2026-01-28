export default function AboutPage() {
  return (
    <main className="bg-blackPrimary text-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Quiénes somos</h1>
        <p className="text-grayText max-w-2xl mx-auto">
          En AVE Builders gestionamos reformas con una visión clara:
          planificación, transparencia y ejecución profesional de principio a
          fin.
        </p>
      </section>

      {/* BLOQUE 1 - IDENTIDAD */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6">AVE Builders</h2>
        <p className="text-grayText leading-relaxed">
          Somos una empresa especializada en reformas integrales, rehabilitación
          de espacios y mantenimiento general. Nuestro enfoque se basa en una
          gestión ordenada del proyecto, cuidando cada detalle técnico y
          manteniendo una comunicación clara con el cliente en todo momento.
        </p>
      </section>

      {/* BLOQUE 2 - METODOLOGÍA */}
      <section className="bg-blackSecondary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Cómo trabajamos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-goldPrimary rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">1. Análisis</h3>
              <p className="text-grayText">
                Estudiamos tu proyecto, necesidades y presupuesto para definir
                una solución realista y bien planteada.
              </p>
            </div>

            <div className="border border-goldPrimary rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">2. Planificación</h3>
              <p className="text-grayText">
                Organizamos tiempos, recursos y fases de trabajo para evitar
                improvisaciones y retrasos.
              </p>
            </div>

            <div className="border border-goldPrimary rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">3. Ejecución</h3>
              <p className="text-grayText">
                Ejecutamos la obra con control técnico, supervisión continua y
                cumplimiento de los plazos acordados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 3 - VALORES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Nuestros valores
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-goldPrimary text-4xl font-bold mb-4">01</p>
            <h4 className="font-semibold mb-2">Transparencia</h4>
            <p className="text-grayText text-sm">
              Presupuestos claros y comunicación honesta desde el inicio.
            </p>
          </div>

          <div className="text-center">
            <p className="text-goldPrimary text-4xl font-bold mb-4">02</p>
            <h4 className="font-semibold mb-2">Compromiso</h4>
            <p className="text-grayText text-sm">
              Cumplimos lo que prometemos y respetamos los acuerdos.
            </p>
          </div>

          <div className="text-center">
            <p className="text-goldPrimary text-4xl font-bold mb-4">03</p>
            <h4 className="font-semibold mb-2">Calidad</h4>
            <p className="text-grayText text-sm">
              Materiales adecuados, acabados cuidados y control del detalle.
            </p>
          </div>

          <div className="text-center">
            <p className="text-goldPrimary text-4xl font-bold mb-4">04</p>
            <h4 className="font-semibold mb-2">Profesionalidad</h4>
            <p className="text-grayText text-sm">
              Gestión seria, organizada y orientada a resultados.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-blackSecondary py-32 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          ¿Hablamos de tu proyecto?
        </h2>
        <p className="text-grayText text-lg mb-8">
          Cuéntanos qué necesitas y te ayudamos a convertirlo en una realidad.
        </p>
        <a
          href="/contact"
          className="inline-block bg-goldPrimary text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition"
        >
          Contactar
        </a>
      </section>
    </main>
  );
}
