"use client";

import { useEffect, useState } from "react";

export default function ProjectDetail({ id }: { id: string }) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/public/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [id]);

  if (!project) return <p>Cargando...</p>;

  return <div>{project.name}</div>;
}
