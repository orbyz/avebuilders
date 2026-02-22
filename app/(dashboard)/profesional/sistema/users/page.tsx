"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "empleado" | "cliente";
  isActive: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    const res = await fetch("/api/users");

    if (res.status === 401 || res.status === 403) {
      window.location.href = "/login";
      return;
    }

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSave = async () => {
    if (!editingUser) return;

    setError("");

    const isNew = !editingUser._id;

    const endpoint = isNew ? "/api/users" : `/api/users/${editingUser._id}`;

    const method = isNew ? "POST" : "PATCH";

    const body = isNew
      ? {
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          password: "123456", // temporal simple por ahora
        }
      : {
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          isActive: editingUser.isActive,
        };

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error guardando usuario");
      return;
    }

    setEditingUser(null);
    await loadUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Usuarios</h1>

      <button
        onClick={() =>
          setEditingUser({
            _id: "",
            name: "",
            email: "",
            role: "empleado",
            isActive: true,
          } as any)
        }
        className="mb-4 bg-brand-accent hover:bg-app-accent px-4 py-2 rounded text-black"
      >
        + Nuevo Usuario
      </button>

      <table className="w-full text-sm mb-8">
        <thead>
          <tr className="text-left border-b border-neutral-700">
            <th className="py-2">Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b border-neutral-800">
              <td className="py-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isActive ? "Sí" : "No"}</td>
              <td>
                <button
                  onClick={() => setEditingUser(u)}
                  className="bg-brand-accent hover:bg-app-accent text-app-bg px-2 rounded-sm py-1"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 max-w-md">
          <h2 className="text-lg font-semibold mb-4">Editar Usuario</h2>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          <input
            className="w-full mb-3 p-2 bg-neutral-800 rounded"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />

          <input
            className="w-full mb-3 p-2 bg-neutral-800 rounded"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />

          <select
            className="w-full mb-3 p-2 bg-neutral-800 rounded"
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                role: e.target.value as any,
              })
            }
          >
            <option value="admin">Admin</option>
            <option value="empleado">Empleado</option>
            <option value="cliente">Cliente</option>
          </select>

          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={editingUser.isActive}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  isActive: e.target.checked,
                })
              }
            />
            Activo
          </label>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-green-500 px-4 py-2 rounded text-black"
            >
              Guardar
            </button>

            <button
              onClick={() => setEditingUser(null)}
              className="bg-neutral-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
