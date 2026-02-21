"use client";

import { useEffect, useState } from "react";

interface Gallery {
  before: string[];
  process: string[];
  after: string[];
}

interface Project {
  _id: string;
  name: string;
  service?: string;
  year?: number;
  coverImage?: string;
  gallery: Gallery;
}

export default function ProjectPublicDetail({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch(`/api/public/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [id]);

  if (!project) {
    return (
      <div className="py-32 text-center">
        <p className="text-gray-400">Cargando proyecto...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative h-[70vh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.coverImage})`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.name}
          </h1>

          <div className="flex gap-6 text-gray-300 text-sm">
            {project.service && <span>{project.service}</span>}
            {project.year && <span>{project.year}</span>}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        <GalleryBlock title="Inicio de obra" images={project.gallery?.before} />
        <GalleryBlock title="Proceso" images={project.gallery?.process} />
        <GalleryBlock title="Resultado final" images={project.gallery?.after} />
      </section>
    </div>
  );
}

function GalleryBlock({ title, images }: { title: string; images?: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold border-b border-neutral-800 pb-4">
        {title}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img} className="overflow-hidden rounded-xl group">
            <img
              src={img}
              className="w-full h-72 object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
