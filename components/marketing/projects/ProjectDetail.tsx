"use client";

import { useEffect, useState } from "react";

interface Project {
  _id: string;
  name: string;
  location?: string;
  year?: number;
  coverImage?: string;
  description?: string;
  gallery: {
    before: string[];
    process: string[];
    after: string[];
  };
}

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/public/projects/${id}`)
        .then((res) => res.json())
        .then((data) => setProject(data));
    });
  }, [params]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando proyecto...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* HERO */}
      {project.coverImage && (
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="max-w-6xl mx-auto px-6 pb-16 text-white">
              <h1 className="text-4xl md:text-6xl font-bold">{project.name}</h1>

              <p className="text-lg text-gray-200 mt-3">
                {project.location} {project.year && `· ${project.year}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* Descripción */}
        {project.description && (
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-bold">Descripción del proyecto</h2>
            <p className="text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* GALERÍAS */}
        {renderGallery("Inicio de obra", project.gallery?.before)}
        {renderGallery("Proceso", project.gallery?.process)}
        {renderGallery("Resultado final", project.gallery?.after)}

        {/* CTA */}
        <div className="bg-neutral-900 p-12 rounded-2xl text-center space-y-6">
          <h3 className="text-3xl font-bold">
            ¿Te gustaría un resultado similar?
          </h3>
          <p className="text-gray-400">
            Solicita tu presupuesto y hagamos realidad tu proyecto.
          </p>
          <a
            href="/contacto"
            className="inline-block bg-primary text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Solicitar presupuesto
          </a>
        </div>
      </div>
    </div>
  );
}

function renderGallery(title: string, images?: string[]) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img} className="rounded-xl overflow-hidden">
            <img
              src={img}
              className="w-full h-72 object-cover hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
