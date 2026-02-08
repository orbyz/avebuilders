"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import LeadDetailsModal from "./LeadDetailsModal";

export default function LeadsTableClient({ leads }: { leads: any[] }) {
  // 🔹 Estados
  const [leadsState, setLeadsState] = useState(leads);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<null | {
    message: string;
    variant?: "default" | "error";
  }>(null);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  // 🔹 Acción convertir
  async function convertLead(leadId: string) {
    if (loadingId) return;

    setLoadingId(leadId);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId }),
    });

    if (res.ok) {
      setLeadsState((prev) =>
        prev.map((lead) =>
          lead._id === leadId ? { ...lead, status: "convertido" } : lead,
        ),
      );

      setToast({ message: "Lead convertido en proyecto" });
    } else {
      const data = await res.json();
      setToast({
        message: data.error || "Error al convertir lead",
        variant: "error",
      });
    }

    setLoadingId(null);
  }

  // 🔹 JSX
  return (
    <>
      {/* Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leadsState.map((lead) => (
            <TableRow key={lead._id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone || "—"}</TableCell>
              <TableCell>
                <span className="text-xs rounded bg-app-surface2 px-2 py-1">
                  {lead.status}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedLead(lead)}
                >
                  Ver
                </Button>

                <Button
                  size="sm"
                  disabled={
                    lead.status === "convertido" || loadingId === lead._id
                  }
                  onClick={() => convertLead(lead._id)}
                >
                  {loadingId === lead._id
                    ? "Convirtiendo..."
                    : lead.status === "convertido"
                      ? "Convertido"
                      : "Convertir"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}

      {/* 🔔 TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
