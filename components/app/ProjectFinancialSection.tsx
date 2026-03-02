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
  const [labourCost, setLabourCost] = useState(0);

  useEffect(() => {
    fetch(`/api/projects/${projectId}/invoices`)
      .then((res) => res.json())
      .then((data) => setInvoices(data));
    fetch(`/api/projects/${projectId}/labour-cost`)
      .then((res) => res.json())
      .then((data) => setLabourCost(data.totalLabour || 0));
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

  const realProfit = paidIncome - (paidExpenses + labourCost);
  const marginPercentage =
    paidIncome > 0 ? (realProfit / paidIncome) * 100 : null;

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

    await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setInvoices((prev) =>
      prev.map((inv) => (inv._id === id ? { ...inv, status: newStatus } : inv)),
    );
  }

  return (
    <div className="space-y-8">
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
          <FinancialCard
            label="Costo de mano de obra"
            value={labourCost}
            color="text-purple-500"
          />
          <FinancialCard
            label="Margen %"
            value={
              marginPercentage !== null
                ? `${marginPercentage.toFixed(1)}%`
                : "—"
            }
            color={
              marginPercentage === null
                ? "text-gray-500"
                : marginPercentage >= 0
                  ? "text-green-500"
                  : "text-red-500"
            }
            isCurrency={false}
          />

          {/* KPIs de riesgo */}
          <div className="space-y-4 mt-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Riesgo Financiero
            </h3>

            <div className="grid md:grid-cols-3 gap-3">
              <FinancialCard
                label="Pendiente de Pago"
                value={pendingExpenses}
                color="text-yellow-500"
              />
              <FinancialCard
                label="Facturas Vencidas"
                value={overdueInvoices.length}
                color={
                  overdueInvoices.length > 0 ? "text-red-500" : "text-green-500"
                }
                isCurrency={false}
              />
              <FinancialCard
                label="Importe Vencido"
                value={overdueAmount}
                color={overdueAmount > 0 ? "text-red-500" : "text-green-500"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Crear factura */}
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Nueva Factura
        </h3>
        <div className="grid md:grid-cols-4 gap-3">
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
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
        <div className="grid grid-cols-6 text-xs uppercase text-gray-500 px-4 py-3 border-b border-neutral-800">
          <span>Concepto</span>
          <span>Tipo</span>
          <span>Vencimiento</span>
          <span>Importe</span>
          <span>Estado</span>
          <span className="text-right">Acción</span>
        </div>

        {invoices.map((inv) => (
          <div
            key={inv._id}
            className="grid grid-cols-6 px-4 py-3 text-sm items-center border-b border-neutral-800 hover:bg-neutral-800/40 transition"
          >
            <span className="font-medium">{inv.concept}</span>
            <span>{inv.type === "income" ? "Ingreso" : "Gasto"}</span>
            <span>
              {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-"}
            </span>
            <span className="font-semibold">
              € {(inv.amount ?? 0).toLocaleString()}
            </span>
            <span
              className={
                inv.status === "paid" ? "text-green-500" : "text-yellow-500"
              }
            >
              {inv.status === "paid" ? "Pagado" : "Pendiente"}
            </span>

            <div className="text-right">
              <button
                onClick={() => toggleStatus(inv._id, inv.status)}
                className="text-xs px-3 py-1 rounded-md bg-neutral-700 hover:bg-neutral-600 transition"
              >
                Cambiar
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
  value: number | string;
  color: string;
  isCurrency?: boolean;
}) {
  return (
    <div className="bg-neutral-900 px-4 py-3 rounded-lg border border-neutral-800">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-lg font-semibold mt-1 ${color}`}>
        {isCurrency && typeof value === "number" ? "€ " : ""}
        {typeof value === "number" ? value.toLocaleString() : value}
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
