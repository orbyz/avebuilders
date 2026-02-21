"use client";

import { useEffect, useState } from "react";

export default function ProjectWorklogs({ projectId }: { projectId: string }) {
  const [worklogs, setWorklogs] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
  ]);

  useEffect(() => {
    fetch(`/api/projects/${projectId}/worklogs`)
      .then(async (res) => {
        const text = await res.text();
        console.log("STATUS:", res.status);
        console.log("RESPONSE:", text);
        return res.ok ? JSON.parse(text) : [];
      })
      .then(setWorklogs)
      .catch(console.error);

    fetch("/api/employees")
      .then((res) => res.json())
      .then(setEmployees);
  }, [projectId]);

  const createWorklog = async () => {
    if (!selectedEmployee || !date) {
      alert("Selecciona empleado y fecha");
      return;
    }

    const res = await fetch("/api/worklogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId: selectedEmployee,
        projectId,
        date,
      }),
    });

    const text = await res.text();
    console.log("POST STATUS:", res.status);
    console.log("POST RESPONSE:", text);

    if (!res.ok) return;

    const newWorklog = JSON.parse(text);

    setWorklogs((prev) => [newWorklog, ...prev]);

    setSelectedEmployee("");
    setDate("");
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  {
    /* Generador de semana */
  }
  const generateWeek = async () => {
    if (!selectedEmployee || !week || !selectedDays.length) {
      alert("Selecciona empleado, semana y días.");
      return;
    }

    const [year, weekNumber] = week.split("-W");

    const firstDayOfYear = new Date(Number(year), 0, 1);
    const daysOffset = (Number(weekNumber) - 1) * 7;

    const monday = new Date(firstDayOfYear);
    monday.setDate(firstDayOfYear.getDate() + daysOffset);

    // Ajustar al lunes real ISO
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);

    const res = await fetch("/api/worklogs/generate-week", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId: selectedEmployee,
        projectId,
        weekStart: monday,
        days: selectedDays,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }

    setWorklogs((prev) => [...data, ...prev]);
  };

  {
    /* Cierre de semana */
  }
  const closeWeek = async (weekStart: string) => {
    const confirmClose = confirm(
      "¿Cerrar esta semana? Se generarán nóminas por cada empleado.",
    );
    if (!confirmClose) return;

    const res = await fetch("/api/worklogs/close-week", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId, // ← usamos el projectId del componente
        weekStart,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("ERROR STATUS:", res.status);
      console.log("ERROR RESPONSE:", data);
      alert(data.error || "Error desconocido");
      return;
    }

    alert("Semana cerrada correctamente.");

    // refrescamos la vista
    window.location.reload();
  };

  const totalCost = worklogs.reduce((sum, w) => sum + w.dailyRateSnapshot, 0);

  const groupedByWeek = worklogs.reduce((acc: any, log: any) => {
    const key = new Date(log.weekStart).toISOString();

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(log);

    return acc;
  }, {});

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Coste Laboral</h2>
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mb-8">
        <h3 className="text-lg font-semibold mb-4">Generar semana laboral</h3>

        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="bg-neutral-800 p-2 rounded"
          >
            <option value="">Empleado</option>
            {employees.map((e) => (
              <option key={e._id} value={e.userId._id}>
                {e.userId.name}
              </option>
            ))}
          </select>

          <input
            type="week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="bg-neutral-800 p-2 rounded"
          />

          <div className="flex gap-2">
            {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
              <label key={day} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                {day.toUpperCase()}
              </label>
            ))}
          </div>

          <button
            onClick={generateWeek}
            className="bg-brand-accent hover:bg-app-accent text-brand-bg px-4 py-2 rounded"
          >
            Generar semana
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="bg-neutral-800 p-2 rounded"
        >
          <option value="">Seleccionar empleado</option>
          {employees.map((e) => (
            <option key={e._id} value={e.userId._id}>
              {e.userId.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-neutral-800 p-2 rounded"
        />

        <button
          onClick={createWorklog}
          className="bg-brand-accent hover:bg-app-accent text-brand-bg px-4 py-2 rounded"
        >
          Añadir
        </button>
      </div>

      {Object.entries(groupedByWeek)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([weekStart, logs]: any) => {
          const totalWeek = logs.reduce(
            (sum: number, w: any) => sum + w.dailyRateSnapshot,
            0,
          );

          const isClosed = logs.every((w: any) => w.status === "closed");

          const start = new Date(weekStart);
          const end = new Date(start);
          end.setDate(start.getDate() + 6);

          return (
            <div
              key={weekStart}
              className="mb-10 bg-neutral-900 p-6 rounded-xl border border-neutral-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Semana {start.toLocaleDateString()} –{" "}
                  {end.toLocaleDateString()}
                </h3>

                {!isClosed && (
                  <button
                    onClick={() => closeWeek(weekStart)}
                    className="bg-red-600 px-4 py-2 rounded"
                  >
                    Cerrar semana
                  </button>
                )}

                {isClosed && (
                  <span className="text-green-400 font-semibold">Cerrada</span>
                )}
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="text-left py-2">Empleado</th>
                    <th className="text-left py-2">Fecha</th>
                    <th className="text-right py-2">Coste</th>
                    <th className="py-2 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((w: any) => (
                    <tr key={w._id} className="border-b border-neutral-800">
                      <td className="py-2">{w.employee?.name}</td>

                      <td className="py-2">
                        {new Date(w.date).toLocaleDateString()}
                      </td>

                      <td className="py-2 text-right tabular-nums">
                        {w.dailyRateSnapshot} €
                      </td>

                      <td className="py-2 text-right">
                        {w.status === "open" && (
                          <button
                            onClick={async () => {
                              const confirmDelete = confirm(
                                "¿Eliminar este registro?",
                              );
                              if (!confirmDelete) return;

                              const res = await fetch(
                                `/api/worklogs/${w._id}`,
                                { method: "DELETE" },
                              );

                              if (!res.ok) return;

                              setWorklogs((prev) =>
                                prev.filter((item) => item._id !== w._id),
                              );
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            Eliminar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right mt-4 font-semibold">
                Total semana: {totalWeek} €
              </div>
            </div>
          );
        })}

      <div className="text-right mt-4 font-semibold">
        Total coste laboral: {totalCost} €
      </div>
    </div>
  );
}
