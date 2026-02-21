import connectDB from "@/lib/db/mongoose";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { Advance } from "@/lib/modules/finance/advance.model";
import Project from "@/lib/modules/projects/model";
import Link from "next/link";
import GeneratePayrollButton from "./../components/GeneratePayrollButton";
import AddWorkLog from "../components/AddWorkLog";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import PayPayrollButton from "../components/PayPayrollButton";

export default async function EmployeeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const employee = await EmployeeProfile.findById(id);
  if (!employee) {
    return <div>No encontrado</div>;
  }

  const worklogs = await WorkLog.find({
    employee: id,
    status: "open",
  })
    .populate("project", "name")
    .sort({ date: -1 });

  const advances = await Advance.find({
    employee: id,
    payrollBatch: null,
  }).sort({ date: -1 });

  const totalWorked = worklogs.reduce((acc, w) => acc + w.dailyRate, 0);

  const totalAdvance = advances.reduce((acc, a) => acc + a.amount, 0);

  const balance = totalWorked - totalAdvance;

  const projects = await Project.find().select("name");

  const payrolls = await PayrollBatch.find({
    employee: id,
  }).sort({ weekStart: -1 });

  return (
    <div className="space-y-8">
      <Link href="/profesional/employees" className="text-sm text-gray-500">
        ← Volver
      </Link>

      {/* Información básica */}
      <div className="bg-brand-bg shadow rounded p-6 space-y-2">
        <h1 className="text-2xl font-bold">{employee.fullName}</h1>
        <p>
          <strong>Rol:</strong> {employee.role}
        </p>
        <p>
          <strong>Costo Diario:</strong> € {employee.dailyRate}
        </p>
        <p>
          <strong>Estado:</strong> {employee.isActive ? "Activo" : "Inactivo"}
        </p>
      </div>
      <AddWorkLog
        employeeId={employee._id.toString()}
        projects={projects.map((p) => ({
          _id: p._id.toString(),
          name: p.name,
        }))}
      />

      {/* Resumen financiero */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-brand-bg p-4 rounded shadow">
          <p className="text-sm text-brand-text">Total trabajado</p>
          <p className="text-xl font-bold">€ {totalWorked}</p>
        </div>

        <div className="bg-brand-bg p-4 rounded shadow">
          <p className="text-sm text-brand-text">Anticipos</p>
          <p className="text-xl font-bold">€ {totalAdvance}</p>
        </div>

        <div className="bg-brand-bg p-4 rounded shadow">
          <p className="text-sm text-brand-text">Balance pendiente</p>
          <p
            className={`text-xl font-bold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            € {balance}
          </p>
        </div>
      </div>
      <GeneratePayrollButton employeeId={employee._id.toString()} />

      {/* WorkLogs */}
      <div className="bg-brand-bg shadow rounded overflow-hidden">
        <h2 className="p-4 text-brand-text font-semibold border-b">
          Días trabajados (abiertos)
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-brand-bg">
            <tr>
              <th className="p-3 text-left text-brand-text">Fecha</th>
              <th className="p-3 text-left text-brand-text">Proyecto</th>
              <th className="p-3 text-left text-brand-text">Monto</th>
            </tr>
          </thead>
          <tbody>
            {worklogs.map((w: any) => (
              <tr key={w._id} className="border-t">
                <td className="p-3">{new Date(w.date).toLocaleDateString()}</td>
                <td className="p-3">{w.project?.name}</td>
                <td className="p-3">€ {w.dailyRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Advances */}
      <div className="bg-brand-bg shadow rounded overflow-hidden">
        <h2 className="p-4 text-brand-text font-semibold border-b">
          Anticipos pendientes
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-brand-bg">
            <tr>
              <th className="p-3 text-left text-brand-text">Fecha</th>
              <th className="p-3 text-left text-brand-text">Monto</th>
              <th className="p-3 text-left text-brand-text">Nota</th>
            </tr>
          </thead>
          <tbody>
            {advances.map((a: any) => (
              <tr key={a._id} className="border-t">
                <td className="p-3">{new Date(a.date).toLocaleDateString()}</td>
                <td className="p-3">€ {a.amount}</td>
                <td className="p-3">{a.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* History */}

      <div className="bg-brand-bg shadow rounded overflow-hidden">
        <h2 className="p-4 font-semibold border-b">Historial de Payroll</h2>

        <table className="w-full text-sm">
          <thead className="bg-brand-bg">
            <tr>
              <th className="p-3 text-left text-brand-accent">Semana</th>
              <th className="p-3 text-left text-brand-accent">Trabajado</th>
              <th className="p-3 text-left text-brand-accent">Anticipos</th>
              <th className="p-3 text-left text-brand-accent">Neto</th>
              <th className="p-3 text-left text-brand-accent">Estado</th>
              <th className="p-3 text-left text-brand-accent">Acción</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p: any) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">
                  {new Date(p.weekStart).toLocaleDateString()} -{" "}
                  {new Date(p.weekEnd).toLocaleDateString()}
                </td>

                <td className="p-3">€ {p.totalWorked}</td>
                <td className="p-3">€ {p.totalAdvance}</td>
                <td className="p-3">€ {p.netToPay}</td>

                <td className="p-3">
                  {p.status === "paid" ? (
                    <span className="text-green-600 font-medium">Pagado</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Draft</span>
                  )}
                </td>

                <td className="p-3 space-x-3">
                  {p.status === "paid" && (
                    <Link
                      href={`/profesional/payroll/${p._id}`}
                      className="text-brand-bg bg-app-accent rounded-md py-1 px-2 hover:bg-brand-accent text-sm"
                    >
                      Ver recibo
                    </Link>
                  )}

                  {p.status !== "paid" && (
                    <PayPayrollButton batchId={p._id.toString()} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
