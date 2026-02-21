"use client";

import { useState } from "react";
import Image from "next/image";

interface Gallery {
  before: string[];
  process: string[];
  after: string[];
}

export default function ProjectGalleryManager({
  projectId,
  initialGallery,
}: {
  projectId: string;
  initialGallery: Gallery;
}) {
  const [gallery, setGallery] = useState(initialGallery);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<"before" | "process" | "after">(
    "before",
  );

  async function addImage() {
    if (!imageUrl) return;

    await fetch("/api/projects/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        category,
        imageUrl,
      }),
    });

    setGallery((prev) => ({
      ...prev,
      [category]: [...prev[category], imageUrl],
    }));

    setImageUrl("");
  }

  async function removeImage(cat: keyof Gallery, url: string) {
    await fetch("/api/projects/gallery/remove", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        category: cat,
        imageUrl: url,
      }),
    });

    setGallery((prev) => ({
      ...prev,
      [cat]: prev[cat].filter((img) => img !== url),
    }));
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Galería</h2>

      {/* Añadir imagen */}
      <div className="bg-neutral-900 p-6 rounded-xl space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="bg-neutral-800 p-3 rounded"
          >
            <option value="before">Inicio</option>
            <option value="process">Proceso</option>
            <option value="after">Final</option>
          </select>

          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL imagen"
            className="bg-neutral-800 p-3 rounded col-span-2"
          />
        </div>

        <button
          onClick={addImage}
          className="bg-brand-accent text-brand-bg hover:bg-brand-accent/80 px-6 py-3 rounded-lg font-semibold"
        >
          Añadir imagen
        </button>
      </div>

      {/* Mostrar categorías */}
      {(["before", "process", "after"] as const).map((cat) => (
        <div key={cat} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">
            {cat === "before"
              ? "Inicio"
              : cat === "process"
                ? "Proceso"
                : "Final"}
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            {gallery[cat].length === 0 ? (
              <div className="bg-neutral-800 h-40 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                Sin imágenes
              </div>
            ) : (
              gallery[cat].map((img) => (
                <div
                  key={img}
                  className="relative group rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={img}
                    alt="Imagen del proyecto"
                    width={600}
                    height={400}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <button
                    onClick={() => removeImage(cat, img)}
                    className="absolute top-2 right-2 bg-red-600 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
