"use client";

import { useEffect, useState } from "react";

interface Invoice {
  _id: string;
  type: "income" | "expense";
  concept: string;
  amount: number;
  status: "pending" | "paid";
  dueDate?: string;
}

export default function ProjectFinancialSection({
  projectId,
}: {
  projectId: string;
}) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"income" | "expense">("income");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetch(`/api/invoices/${projectId}`)
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, [projectId]);

  async function createInvoice() {
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        type,
        concept,
        amount,
        dueDate,
      }),
    });

    const newInvoice = await res.json();
    setInvoices((prev) => [newInvoice, ...prev]);
    setConcept("");
    setAmount(0);
    setDueDate("");
  }

  const totalIncome = invoices
    .filter((i) => i.type === "income")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const totalExpenses = invoices
    .filter((i) => i.type === "expense")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const paidIncome = invoices
    .filter((i) => i.type === "income" && i.status === "paid")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const paidExpenses = invoices
    .filter((i) => i.type === "expense" && i.status === "paid")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const pendingIncome = invoices
    .filter((i) => i.type === "income" && i.status === "pending")
    .reduce((sum, i) => sum + i.amount, 0);

  const pendingExpenses = invoices
    .filter((i) => i.type === "expense" && i.status === "pending")
    .reduce((sum, i) => sum + i.amount, 0);

  const realProfit = paidIncome - paidExpenses;

  const now = new Date();

  const overdueInvoices = invoices.filter(
    (i) => i.status === "pending" && i.dueDate && new Date(i.dueDate) < now,
  );

  const overdueAmount = overdueInvoices.reduce(
    (sum, i) => sum + (i.amount ?? 0),
    0,
  );

  async function toggleStatus(id: string, current: string) {
    const newStatus = current === "paid" ? "pending" : "paid";

    await fetch("/api/invoices/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    setInvoices((prev) =>
      prev.map((inv) => (inv._id === id ? { ...inv, status: newStatus } : inv)),
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Finanzas del Proyecto</h2>
      {overdueInvoices.length > 0 && (
        <div className="bg-red-900/40 border border-red-700 p-4 rounded-xl mb-6">
          ⚠️ Hay {overdueInvoices.length} facturas vencidas por un total de €{" "}
          {overdueAmount.toLocaleString()}
        </div>
      )}
      {/* KPI */}
      <div className="space-y-6 my-8">
        {/* KPIs financieros */}
        <div>
          <h3 className="text-sm text-gray-400 mb-3">Finanzas</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <FinancialCard
              label="Facturado"
              value={totalIncome}
              color="text-blue-500"
            />
            <FinancialCard
              label="Cobrado"
              value={paidIncome}
              color="text-green-500"
            />
            <FinancialCard
              label="Beneficio Real"
              value={realProfit}
              color={realProfit >= 0 ? "text-green-500" : "text-red-500"}
            />
            <FinancialCard
              label="Pendiente Cobro"
              value={pendingIncome}
              color="text-yellow-500"
            />
          </div>

          {/* KPIs de riesgo */}
          <div className="space-y-6 my-8">
            <h3 className="text-sm text-gray-400 mb-3">Riesgo</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <FinancialCard
                label="Pendiente de Pago"
                value={pendingExpenses}
                color="text-yellow-500"
              />
              <FinancialCard
                label="Facturas vencidas"
                value={overdueInvoices.length}
                color={
                  overdueInvoices.length > 0 ? "text-red-500" : "text-green-500"
                }
                isCurrency={false}
              />

              <FinancialCard
                label="Importe vencido"
                value={overdueAmount}
                color={overdueAmount > 0 ? "text-red-500" : "text-green-500"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Crear factura */}
      <div className="bg-neutral-900 p-6 rounded-xl space-y-4">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="bg-neutral-800 p-3 rounded"
          />
          <input
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Concepto"
            className="bg-neutral-800 p-3 rounded"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Importe"
            className="bg-neutral-800 p-3 rounded"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="bg-neutral-800 p-3 rounded"
          >
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
        </div>

        <button
          onClick={createInvoice}
          className="bg-brand-accent text-brand-bg hover:bg-brand-accent/80 px-6 py-3 rounded-lg font-semibold"
        >
          Añadir factura
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {invoices.map((inv) => (
          <div
            key={String(inv._id)}
            className="bg-neutral-900 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{inv.concept}</p>
              <p className="text-sm text-gray-400">
                {inv.type === "income" ? "Ingreso" : "Gasto"}
              </p>

              {/* 👇 AQUÍ VA */}
              <p className="text-xs text-gray-500">
                Vence:{" "}
                {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-"}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="font-bold">
                € {(inv.amount ?? 0).toLocaleString()}
              </p>

              <button
                onClick={() => toggleStatus(inv._id, inv.status)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                  inv.status === "paid" ? "bg-green-600" : "bg-yellow-600"
                }`}
              >
                {inv.status === "paid" ? "Pagado" : "Pendiente"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function FinancialCard({
  label,
  value,
  color,
  isCurrency = true,
}: {
  label: string;
  value: number;
  color: string;
  isCurrency?: boolean;
}) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-2 ${color}`}>
        {isCurrency ? "€ " : ""}
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl text-center">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value.toLocaleString()} €</p>
    </div>
  );
}
