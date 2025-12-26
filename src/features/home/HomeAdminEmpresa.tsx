// src/features/home/HomeAdminEmpresa.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface Subordinate {
  id: string;
  name: string;
}

export default function HomeAdminEmpresa() {
  const { usuario } = useAuth();
  const [equipo, setEquipo] = useState<Subordinate[]>([]);

  if (!usuario?.activeAssignment) {
    return <div className="p-4 sm:p-6">No hay asignacion activa disponible.</div>;
  }

  const a = usuario.activeAssignment;

  useEffect(() => {
    api
      .get<Subordinate[]>("/auth/me/subordinates")
      .then((res) => setEquipo(res.data))
      .catch((err) => console.error("Error cargando subordinados:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-sky-800">
        Supervisor | {usuario.profile?.firstName || usuario.email}
      </h1>

      <div className="p-4 bg-white/90 shadow-sm rounded-xl border border-sky-100 backdrop-blur">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Unidad supervisada</h2>

        <ul className="text-slate-700 space-y-1">
          <li>
            <strong>Empresa:</strong> {a.company?.name}
          </li>
          <li>
            <strong>Unidad de negocio:</strong> {a.businessUnit?.name} ({a.businessUnit?.type})
          </li>
        </ul>
      </div>

      <div className="p-4 bg-white/90 shadow-sm rounded-xl border border-sky-100 backdrop-blur">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Equipo de asesores</h2>

        {equipo.length === 0 ? (
          <p className="text-slate-600">No hay asesores asignados.</p>
        ) : (
          <ul className="space-y-2">
            {equipo.map((s) => (
              <li
                key={s.id}
                className="p-2 bg-sky-50 rounded border border-sky-100 text-slate-800"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link
          to="/pipeline"
          className="px-4 py-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white rounded shadow hover:shadow-md text-center"
        >
          Ver funnel del equipo
        </Link>

        <Link
          to="/dashboard/supervisor"
          className="px-4 py-2 bg-white text-sky-800 border border-sky-200 rounded shadow-sm hover:bg-sky-50 text-center"
        >
          Ver dashboard
        </Link>
      </div>
    </div>
  );
}
