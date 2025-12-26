// src/features/home/HomeAsesor.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

type Opportunity = {
  id: string;
  cliente?: string;
  razonSocial?: string;
  stage?: string;
  valor?: number;
  updatedAt?: string;
};

type Task = {
  id: string;
  text: string;
  dueDate?: string;
};

export default function HomeAsesor() {
  const { usuario } = useAuth();
  const [ops, setOps] = useState<Opportunity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!usuario?.activeAssignment) {
    return <div className="p-4 sm:p-6">No hay asignacion activa disponible.</div>;
  }

  const a = usuario.activeAssignment;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get<Opportunity[] | { items: Opportunity[] }>(
          "/opportunities?advisorId=me&state=OPEN"
        );
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray((res.data as any).items)
            ? (res.data as any).items
            : [];
        setOps(list);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar tus oportunidades.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await api.get<{ tasks: Task[] }>("/dashboard/advisor");
        setTasks(res.data.tasks ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    void loadTasks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-sky-800">
        Bienvenido, {usuario.profile?.firstName || usuario.email}
      </h1>

      <div className="p-4 bg-white/90 shadow-sm rounded-xl border border-sky-100 backdrop-blur">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Tu contexto actual</h2>

        <ul className="text-gray-700 space-y-1">
          <li>
            <strong>Empresa:</strong> {a.company?.name}
          </li>
          <li>
            <strong>Unidad de negocio:</strong> {a.businessUnit?.name} (
            {a.businessUnit?.type})
          </li>
          <li>
            <strong>Linea de servicio:</strong> {a.serviceLine?.name} (
            {a.serviceLine?.type})
          </li>
          {a.supervisor && (
            <li>
              <strong>Supervisor:</strong> {a.supervisor.name} · {a.supervisor.email}
            </li>
          )}
        </ul>
      </div>

      <div className="p-4 bg-white/90 shadow-sm rounded-xl border border-sky-100 backdrop-blur">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Tus oportunidades abiertas</h2>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        {loading && <p className="text-sm text-gray-600">Cargando...</p>}
        {!loading && ops.length === 0 && (
          <p className="text-sm text-gray-600">Sin oportunidades abiertas.</p>
        )}
        <div className="space-y-2">
          {ops.map((op) => (
            <div
              key={op.id}
              className="p-3 rounded-xl border border-sky-100 bg-sky-50/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">
                  {op.cliente || op.razonSocial || "-"}
                </p>
                <p className="text-xs text-slate-600">{op.stage || "Sin etapa"}</p>
                {op.updatedAt && (
                  <p className="text-xs text-slate-500">
                    Actualizado {new Date(op.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="text-left sm:text-right space-y-1">
                {op.valor !== undefined && (
                  <p className="text-sm text-slate-800">${op.valor}</p>
                )}
                <Link
                  to={`/oportunidades/${op.id}/editar`}
                  className="text-xs text-sky-700 hover:underline font-semibold"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Link
            to="/oportunidades"
            className="text-sm text-sky-800 hover:underline font-semibold"
          >
            Ver todas
          </Link>
        </div>
      </div>

      <div className="p-4 bg-white/90 shadow-sm rounded-xl border border-sky-100 backdrop-blur">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Notificaciones / tareas</h2>
        {tasks.length === 0 && <p className="text-sm text-slate-600">Sin tareas pendientes.</p>}
        <ul className="list-disc ml-5 space-y-1 text-sm text-slate-700">
          {tasks.map((t) => (
            <li key={t.id}>
              {t.text}
              {t.dueDate ? ` · vence ${new Date(t.dueDate).toLocaleDateString()}` : ""}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link
          to="/oportunidades/nueva"
          className="px-4 py-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 text-white rounded shadow hover:shadow-md text-center"
        >
          Crear nueva oportunidad
        </Link>

        <Link
          to="/oportunidades"
          className="px-4 py-2 bg-white text-sky-800 border border-sky-200 rounded shadow-sm hover:bg-sky-50 text-center"
        >
          Ver mis oportunidades
        </Link>
      </div>
    </div>
  );
}
