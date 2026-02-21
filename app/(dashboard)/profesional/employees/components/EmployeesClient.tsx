"use client";

import { useState } from "react";

export default function EmployeesClient({ employees }: any) {
  const [editing, setEditing] = useState<any>(null);
  const [error, setError] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Empleados</h1>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-neutral-700">
            <th className="py-3 px-2">Nombre</th>
            <th className="py-3 px-2">Email</th>
            <th className="py-3 px-2 text-right">Daily Rate</th>
            <th className="py-3 px-2">Activo</th>
            <th className="py-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e: any) => (
            <tr key={e._id} className="border-b border-neutral-800">
              <td className="py-3 px-2">{e.userId?.name}</td>
              <td className="py-3 px-2">{e.userId?.email}</td>
              <td className="py-3 px-2 text-right tabular-nums">
                {e.dailyRate}
              </td>
              <td className="py-3 px-2">{e.isActive ? "Sí" : "No"}</td>
              <td className="py-3 px-2">
                <button
                  onClick={() => {
                    console.log("CLICK", e);
                    setEditing(e);
                  }}
                  className="bg-brand-accent hover:bg-app-accent text-brand-bg px-2 py-1 rounded-sm"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Editar perfil laboral
            </h2>

            {error && <p className="text-red-400 mb-3">{error}</p>}

            <input
              type="number"
              className="w-full mb-3 p-2 bg-neutral-800 rounded"
              value={editing.dailyRate}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  dailyRate: Number(e.target.value),
                })
              }
            />

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  setError("");

                  const res = await fetch(`/api/employees/${editing._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      dailyRate: editing.dailyRate,
                    }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    setError(data.error);
                    return;
                  }

                  setEditing(null);
                  location.reload();
                }}
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded text-black"
              >
                Guardar
              </button>

              <button
                onClick={() => setEditing(null)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
