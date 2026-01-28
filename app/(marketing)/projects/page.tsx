import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Reforma integral de vivienda",
    category: "Reforma integral",
    image: "/projects/project-1.jpg",
  },
  {
    id: 2,
    title: "Reforma de baño moderno",
    category: "Baños",
    image: "/projects/project-2.jpg",
  },
  {
    id: 3,
    title: "Cocina abierta contemporánea",
    category: "Cocinas",
    image: "/projects/project-3.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-blackPrimary text-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nuestros Proyectos
        </h1>
        <p className="text-grayText max-w-2xl mx-auto">
          Reformas reales, ejecutadas con precisión, planificación y atención al
          detalle. Cada proyecto refleja nuestro compromiso con la calidad.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-gold/20"
            >
              {/* Image */}
              <div className="relative h-72 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <span className="text-gold text-sm">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
