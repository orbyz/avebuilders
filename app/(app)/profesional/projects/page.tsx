"use client";

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  title: string;
  clientName: string;
  status: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">Proyectos</h1>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p._id}
            className="bg-zinc-900 border border-zinc-800 rounded p-4"
          >
            <p className="font-semibold">{p.title}</p>
            <p className="text-sm text-zinc-400">{p.clientName}</p>
            <p className="text-yellow-400 text-sm">{p.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
