"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AddProjectNote({ projectId }: { projectId: string }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submitNote() {
    if (!message.trim()) return;

    setLoading(true);

    const res = await fetch(`/api/projects/${projectId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      setMessage("");
      router.refresh(); // 👈 ESTO ES LA CLAVE
    }

    setLoading(false);
  }

  return (
    <div className="rounded-md border border-app-border bg-app-surface p-4 space-y-3">
      <p className="text-sm text-app-muted">Añadir nota al proyecto</p>

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe una actualización para el cliente..."
      />

      <Button onClick={submitNote} disabled={loading}>
        {loading ? "Guardando..." : "Publicar nota"}
      </Button>
    </div>
  );
}
