import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

type Opportunity = {
  id: string;
  funnelDate?: string;
  supervisor?: string;
  supervisorId?: string;
  advisor?: string;
  advisorId?: string;
  segmentName?: string;
  segmentId?: string;
  rut?: string;
  razonSocial?: string;
  serviceType?: string;
  serviceId?: string;
  probability?: string | number;
  stage?: string;
  state?: string;
  responseDate?: string;
  notes?: string;
  valor?: number;
  updatedAt?: string;
};

export default function OpportunityListPage() {
  const [ops, setOps] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get<Opportunity[] | { items: Opportunity[] }>(
          "/opportunities?advisorId=me"
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

  const formatProbability = (p?: string | number) => {
    if (p === undefined || p === null) return "-";
    if (typeof p === "number") return `${p}%`;
    const map: Record<string, string> = {
      P0: "0%",
      P25: "25%",
      P50: "50%",
      P75: "75%",
      P100: "100%",
    };
    return map[p] || p;
  };

  const formatDate = (value?: string) => (value ? new Date(value).toLocaleDateString() : "-");

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Oportunidades</p>
          <h1 className="text-2xl font-bold text-gray-900">Mis oportunidades</h1>
          <p className="text-gray-600">Vista responsiva centrada en el supervisor y estado.</p>
        </div>
        <Link
          to="/oportunidades/nueva"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 text-center"
        >
          Nueva oportunidad
        </Link>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}
      {loading && <p className="text-sm text-gray-600">Cargando...</p>}

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {ops.map((op) => (
          <div
            key={op.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm text-gray-500">{formatDate(op.funnelDate || op.updatedAt)}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {op.razonSocial || op.segmentName || "-"}
                </p>
                <p className="text-xs text-gray-600">{op.stage || "-"}</p>
              </div>
              <Link
                to={`/oportunidades/${op.id}/editar`}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Editar
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <Info label="Supervisor" value={op.supervisor} />
              <Info label="Asesor" value={op.advisor} />
              <Info label="Segmento" value={op.segmentName || op.segmentId} />
              <Info label="Servicio" value={op.serviceType || op.serviceId} />
              <Info label="RUT" value={op.rut} />
              <Info label="Estado" value={op.state} />
              <Info label="Probabilidad" value={formatProbability(op.probability)} />
              <Info label="Resp. cliente" value={formatDate(op.responseDate)} />
              <div className="sm:col-span-2 text-gray-700">
                <p className="text-xs uppercase text-gray-500">Notas</p>
                <p className="text-sm">{op.notes || "Sin observaciones"}</p>
              </div>
            </div>
          </div>
        ))}
        {ops.length === 0 && !loading && (
          <p className="text-sm text-gray-600">No tienes oportunidades.</p>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div>
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="text-sm text-gray-800">{value ?? "-"}</p>
    </div>
  );
}
