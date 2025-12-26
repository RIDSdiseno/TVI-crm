import { useEffect, useState } from "react";
import api from "../../../services/api";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  area?: string;
  segment?: string;
  status: "ACTIVE" | "INACTIVE";
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get<any[]>("/users");
        const mapped: UserRow[] = res.data.map((u) => ({
          id: u.id,
          name: u.name || u.profile?.firstName || u.email,
          email: u.email,
          role: u.role,
          company: u.company?.name || u.company || "-",
          area: u.area?.name || u.businessUnit?.name,
          segment: u.segment?.name || u.serviceLine?.name,
          status: (u.status as "ACTIVE" | "INACTIVE") ?? "ACTIVE",
        }));
        setUsers(mapped);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };
    void loadUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Administracion</p>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios y roles</h1>
          <p className="text-gray-600">
            Altas de supervisores y asesores, activacion/desactivacion.
          </p>
        </div>
        <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
          Invitar usuario
        </button>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-sm text-gray-600">Cargando usuarios...</div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hidden lg:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              {["Nombre", "Email", "Rol", "Empresa", "Area", "Segmento", "Estado"].map(
                (h) => (
                  <th key={h} className="px-3 py-2 font-semibold text-gray-600">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-3 py-2 text-gray-900">{u.name}</td>
                <td className="px-3 py-2 text-gray-700">{u.email}</td>
                <td className="px-3 py-2 text-gray-700">{u.role}</td>
                <td className="px-3 py-2 text-gray-700">{u.company}</td>
                <td className="px-3 py-2 text-gray-700">{u.area || "-"}</td>
                <td className="px-3 py-2 text-gray-700">{u.segment || "-"}</td>
                <td className="px-3 py-2">
                  <StatusPill status={u.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && !loading && (
          <p className="px-4 py-3 text-sm text-gray-600">Sin usuarios.</p>
        )}
      </div>

      <div className="grid gap-3 lg:hidden">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-lg font-semibold text-gray-900">{u.name}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
              </div>
              <StatusPill status={u.status} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <Info label="Rol" value={u.role} />
              <Info label="Empresa" value={u.company} />
              <Info label="Area" value={u.area} />
              <Info label="Segmento" value={u.segment} />
            </div>
          </div>
        ))}
        {users.length === 0 && !loading && (
          <p className="text-sm text-gray-600">Sin usuarios.</p>
        )}
      </div>

    </div>
  );
}

function StatusPill({ status }: { status: "ACTIVE" | "INACTIVE" }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        status === "ACTIVE"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function Info({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="text-sm text-gray-800">{value ?? "-"}</p>
    </div>
  );
}
