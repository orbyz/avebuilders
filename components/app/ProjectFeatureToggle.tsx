"use client";

import { useState } from "react";

export default function ProjectFeatureToggle({
  projectId,
  initialFeatured,
  status,
}: {
  projectId: string;
  initialFeatured: boolean;
  status: string;
}) {
  const [featured, setFeatured] = useState(initialFeatured);
  const [loading, setLoading] = useState(false);

  const canPublish = status === "finalizado";

  async function toggleFeatured() {
    if (!canPublish) return;

    setLoading(true);

    await fetch("/api/projects/feature", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        featured: !featured,
      }),
    });

    setFeatured(!featured);
    setLoading(false);
  }

  return (
    <div className="space-y-2 my-4">
      <button
        onClick={toggleFeatured}
        disabled={loading || !canPublish}
        className={`px-6 py-3 rounded-lg font-semibold transition ${
          !canPublish
            ? "bg-neutral-700 cursor-not-allowed opacity-50"
            : featured
              ? "bg-green-600 hover:bg-green-700"
              : "bg-neutral-800 hover:bg-neutral-700"
        }`}
      >
        {!canPublish
          ? "Finaliza el proyecto para publicarlo"
          : featured
            ? "Proyecto Publicado"
            : "Publicar Proyecto"}
      </button>

      {!canPublish && (
        <p className="text-xs text-gray-400">
          Solo los proyectos finalizados pueden mostrarse en la web pública.
        </p>
      )}
    </div>
  );
}
