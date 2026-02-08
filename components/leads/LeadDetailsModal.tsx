"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Lead = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status?: string;
};

export default function LeadDetailsModal({
  lead,
  onClose,
}: {
  lead: Lead;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Detalle del Lead</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-app-muted">Nombre</p>
            <p>{lead.name}</p>
          </div>

          <div>
            <p className="text-app-muted">Email</p>
            <p>{lead.email}</p>
          </div>

          <div>
            <p className="text-app-muted">Teléfono</p>
            <p>{lead.phone || "—"}</p>
          </div>

          <div>
            <p className="text-app-muted">Mensaje</p>
            <p className="rounded bg-app-surface2 p-3">{lead.message || "—"}</p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
