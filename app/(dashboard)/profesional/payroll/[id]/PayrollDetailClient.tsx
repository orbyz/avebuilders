"use client";

import { useState } from "react";

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
