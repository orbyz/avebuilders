import Link from "next/link";

interface Project {
  _id: string;
  name: string;
  coverImage?: string;
  service?: string;
  location?: string;
  year?: number;
  featured?: boolean;
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-28">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project._id}`}
            className={`group relative block rounded-3xl overflow-hidden bg-neutral-900 shadow-xl ${
              projects.length === 1 ? "md:col-span-2 lg:col-span-2" : ""
            }`}
          >
            {/* Imagen */}
            <div className="relative overflow-hidden">
              <img
                src={
                  project.coverImage ||
                  "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
                }
                className="w-full h-[440px] object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Badge destacado */}
              {project.featured && (
                <span className="absolute top-4 left-4 bg-primary text-brand-text text-xs font-semibold px-3 py-1 rounded-full">
                  Destacado
                </span>
              )}

              {/* Overlay suave */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500" />
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <p className="text-xs uppercase tracking-wider opacity-70">
                {project.service || "Proyecto"}
              </p>

              <h3 className="text-xl font-semibold mt-1 leading-snug">
                {project.name}
              </h3>

              <div className="flex justify-between text-sm opacity-80 mt-2">
                <span>{project.location || ""}</span>
                <span>{project.year || ""}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
