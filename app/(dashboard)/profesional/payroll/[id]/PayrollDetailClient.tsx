"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function PayrollDetailClient({ batch, payments }: any) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (!amount) return;

    setLoading(true);

    const res = await fetch(`/api/payroll/${batch._id}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Error al pagar");
      return;
    }

    window.location.reload();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    let y = 20;

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("AVE BUILDERS", pageWidth / 2, y, { align: "center" });

    y += 8;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Recibo de Nómina", pageWidth / 2, y, { align: "center" });

    y += 15;

    // Línea separadora
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    // Info empleado
    doc.setFont("helvetica", "bold");
    doc.text("Datos del Empleado", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${batch.employee?.name}`, 20, y);
    y += 6;
    doc.text(`Email: ${batch.employee?.email}`, 20, y);
    y += 10;

    // Periodo
    doc.setFont("helvetica", "bold");
    doc.text("Periodo", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.text(
      `Semana: ${new Date(batch.weekStart).toLocaleDateString()} - ${new Date(
        batch.weekEnd,
      ).toLocaleDateString()}`,
      20,
      y,
    );
    y += 15;

    // Tabla financiera
    doc.setFont("helvetica", "bold");
    doc.text("Resumen Financiero", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    const financialRows = [
      ["Total días trabajado", `${batch.totalWorked} días`],
      ["Anticipos", `${batch.totalAdvance} €`],
      ["Neto a pagar", `${batch.netToPay} €`],
      ["Pagado", `${batch.paidAmount} €`],
      ["Pendiente", `${batch.pendingAmount} €`],
    ];

    financialRows.forEach((row) => {
      doc.text(row[0], 25, y);
      doc.text(row[1], pageWidth - 25, y, { align: "right" });
      y += 8;
    });

    y += 10;

    // Estado visual
    doc.setFont("helvetica", "bold");
    doc.text("Estado:", 20, y);

    const statusText =
      batch.status === "generated"
        ? "Pendiente"
        : batch.status === "partial"
          ? "Pago Parcial"
          : "Pagado";

    doc.setFont("helvetica", "normal");
    doc.text(statusText, 50, y);

    y += 20;

    // Historial de pagos
    doc.setFont("helvetica", "bold");
    doc.text("Historial de Pagos", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    payments.forEach((p: any) => {
      doc.text(`${new Date(p.createdAt).toLocaleDateString()}`, 25, y);
      doc.text(`${p.amount} €`, pageWidth - 25, y, { align: "right" });
      y += 8;
    });

    y += 20;

    // Footer
    doc.line(20, y, pageWidth - 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 20, y);

    y += 6;
    doc.text("Firma Empresa: __________________________", 20, y);

    doc.save(
      `nomina-${batch.employee?.name}-${new Date(
        batch.weekStart,
      ).toLocaleDateString()}.pdf`,
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Nómina de {batch.employee?.name}</h1>

      {/* Resumen */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 space-y-2">
        <p>
          <strong>Semana:</strong>{" "}
          {new Date(batch.weekStart).toLocaleDateString()} -{" "}
          {new Date(batch.weekEnd).toLocaleDateString()}
        </p>

        <p>
          <strong>Total:</strong> {batch.netToPay} €
        </p>

        <p>
          <strong>Pagado:</strong> {batch.paidAmount} €
        </p>

        <p>
          <strong>Pendiente:</strong> {batch.pendingAmount} €
        </p>

        <p>
          <strong>Estado:</strong>{" "}
          {batch.status === "generated"
            ? "Pendiente"
            : batch.status === "partial"
              ? "Parcial"
              : "Pagado"}
        </p>
      </div>

      {/* Pagar */}
      {batch.status !== "paid" && (
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 space-y-4 max-w-sm">
          <h2 className="font-semibold">Registrar Pago</h2>

          <input
            type="number"
            max={batch.pendingAmount}
            min={1}
            className="w-full p-2 bg-neutral-800 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={pay}
            disabled={
              loading ||
              !amount ||
              Number(amount) <= 0 ||
              Number(amount) > batch.pendingAmount
            }
            className="bg-green-500 px-4 py-2 rounded text-black"
          >
            {loading ? "Procesando..." : "Pagar"}
          </button>
        </div>
      )}
      {/* Boton para descargar PDF */}
      <button
        onClick={generatePDF}
        className="bg-brand-accent hover:bg-app-accent text-brand-bg px-2 py-1 rounded "
      >
        Descargar PDF
      </button>

      {/* Historial */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Historial de Pagos</h2>

        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left py-2">Fecha</th>
              <th className="text-right py-2 w-28">Monto</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p: any) => (
              <tr key={p._id} className="border-b border-neutral-800">
                <td className="py-2">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 text-right tabular-nums">{p.amount} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
