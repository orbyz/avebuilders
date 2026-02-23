import Link from "next/link";
import MarginIndicator from "./MarginIndicator";

interface Project {
  _id: string;
  name: string;
  status: string;
  totalIncome: number;
  totalExpenses: number;
  labourCost: number;
  realProfit: number;
  marginPercentage: number;
  overdueInvoices: number;
}

export default function ProjectsSummaryTable({ data }: { data: Project[] }) {
  const sorted = [...data].sort((a, b) => {
    const riskA = a.realProfit < 0 || a.marginPercentage < 5 ? 1 : 0;
    const riskB = b.realProfit < 0 || b.marginPercentage < 5 ? 1 : 0;

    if (riskA !== riskB) return riskB - riskA;
    return a.marginPercentage - b.marginPercentage;
  });

  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-800 text-gray-400">
          <tr>
            <th className="text-left p-3">Proyecto</th>
            <th className="text-left p-3">Estado</th>
            <th className="text-right p-3">Facturado</th>
            <th className="text-right p-3">Coste</th>
            <th className="text-center p-3">Margen</th>
            <th className="text-center p-3">Alertas</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr
              key={p._id}
              className="border-t border-neutral-800 hover:bg-neutral-800/40"
            >
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">{p.status}</td>
              <td className="p-3 text-right">
                € {p.totalIncome.toLocaleString()}
              </td>
              <td className="p-3 text-right">
                € {(p.totalExpenses + p.labourCost).toLocaleString()}
              </td>
              <td className="p-3 text-center">
                <MarginIndicator
                  marginPercentage={p.marginPercentage}
                  realProfit={p.realProfit}
                />
              </td>
              <td className="p-3 text-center">
                {p.overdueInvoices > 0 && "⚠"}
                {p.realProfit < 0 && " 📉"}
              </td>
              <td className="p-3 text-right">
                <Link
                  href={`/profesional/projects/${p._id}`}
                  className="text-blue-400 hover:underline"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
