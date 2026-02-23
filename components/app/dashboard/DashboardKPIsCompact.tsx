interface ProjectSummary {
  totalIncome: number;
  totalExpenses: number;
  labourCost: number;
  realProfit: number;
  overdueInvoices: number;
  marginPercentage: number;
}

export default function DashboardKPIsCompact({
  data,
}: {
  data: ProjectSummary[];
}) {
  const totalIncome = data.reduce((s, p) => s + p.totalIncome, 0);
  const totalExpenses = data.reduce(
    (s, p) => s + p.totalExpenses + p.labourCost,
    0,
  );
  const totalProfit = data.reduce((s, p) => s + p.realProfit, 0);
  const totalRisk = data.filter(
    (p) => p.realProfit < 0 || p.marginPercentage < 5,
  ).length;

  return (
    <div className="grid md:grid-cols-4 gap-4 text-sm">
      <Kpi label="💰 Facturado" value={totalIncome} />
      <Kpi label="💸 Costes Totales" value={totalExpenses} />
      <Kpi
        label="📈 Beneficio Real"
        value={totalProfit}
        highlight={totalProfit < 0}
      />
      <Kpi
        label="⚠ Proyectos en Riesgo"
        value={totalRisk}
        isNumber
        highlight={totalRisk > 0}
      />
    </div>
  );
}

function Kpi({
  label,
  value,
  highlight,
  isNumber,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  isNumber?: boolean;
}) {
  return (
    <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
      <p className="text-gray-400 text-xs">{label}</p>
      <p
        className={`text-xl font-bold mt-1 ${highlight ? "text-red-500" : ""}`}
      >
        {isNumber ? value : `€ ${value.toLocaleString()}`}
      </p>
    </div>
  );
}
