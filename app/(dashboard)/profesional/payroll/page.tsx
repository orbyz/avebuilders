import connectDB from "@/lib/db/mongoose";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import User from "@/lib/modules/users/model";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function PayrollPage() {
  await connectDB();

  const batches = await PayrollBatch.find()
    .populate("employee", "name email")
    .sort({ weekStart: -1, employee: 1 })
    .lean();

  const statusMap: Record<string, string> = {
    generated: "Pendiente",
    partial: "Parcial",
    paid: "Pagado",
  };

  return (
    <Card>
      <CardTitle className="text-2xl font-bold m-4">Centro de Nómina</CardTitle>
      <CardContent>
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left py-2">Empleado</th>
              <th className="text-left py-2">Semana</th>
              <th className="py-2 text-right tabular-nums w-28">Total</th>
              <th className="py-2 text-right tabular-nums w-28">Pagado</th>
              <th className="py-2 text-right tabular-nums w-28">Pendiente</th>
              <th className="text-center py-2">Estado</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {batches.map((b: any) => (
              <tr key={b._id} className="border-b border-neutral-800">
                <td className="py-2">{b.employee?.name}</td>

                <td className="py-2">
                  {new Date(b.weekStart).toLocaleDateString()} -{" "}
                  {new Date(b.weekEnd).toLocaleDateString()}
                </td>

                <td className="py-2 text-right tabular-nums">{b.netToPay} €</td>

                <td className="py-2 text-right tabular-nums">
                  {b.paidAmount} €
                </td>

                <td className="py-2 text-right tabular-nums">
                  {b.pendingAmount} €
                </td>

                <td className="py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      b.status === "paid"
                        ? "bg-green-600"
                        : b.status === "partial"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    }`}
                  >
                    {statusMap[b.status]}
                  </span>
                </td>

                <td className="py-2 text-right">
                  <Link
                    href={`/profesional/payroll/${b._id}`}
                    className="bg-brand-accent hover:bg-app-accent text-brand-bg px-2 py-1 rounded-sm"
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
