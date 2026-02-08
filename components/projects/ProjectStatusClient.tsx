"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

export default function ProjectStatusClient({
  projectId,
  status: initialStatus,
}: {
  projectId: string;
  status: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function changeStatus(newStatus: string) {
    setLoading(true);

    const res = await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setStatus(newStatus);
      setToast("Estado del proyecto actualizado");
    } else {
      setToast("Error al actualizar el estado");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="rounded-md border border-app-border bg-app-surface p-4">
        <p className="text-sm text-app-muted mb-2">Estado del proyecto</p>
        <div className="flex items-center gap-3">
          <span className="text-xs rounded bg-app-surface2 px-2 py-1">
            {status}
          </span>

          {status !== "finalizado" && (
            <Button
              size="sm"
              disabled={loading}
              onClick={() => changeStatus("finalizado")}
            >
              {loading ? "Actualizando..." : "Marcar como finalizado"}
            </Button>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
