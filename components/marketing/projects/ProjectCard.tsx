import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link
      href={`/projects/${project._id}`}
      className="group relative overflow-hidden rounded-3xl"
    >
      <img
        src={project.coverImage}
        className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />

      {/* Info */}
      <div className="absolute bottom-0 p-6 text-white">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="text-sm opacity-80">
          {project.location} · {project.year}
        </p>
      </div>
    </Link>
  );
}
