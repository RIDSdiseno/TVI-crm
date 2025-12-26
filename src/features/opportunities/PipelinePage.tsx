import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

type Stage = "Interesado" | "Cotizacion Enviada" | "Venta" | string;

type Opportunity = {
  id: string;
  cliente: string;
  asesor: string;
  valor: number;
  stage: Stage;
};

export default function PipelinePage() {
  const [ops, setOps] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stages = useMemo(() => {
    const defaults: Stage[] = ["Interesado", "Cotizacion Enviada", "Venta"];
    const fromData = Array.from(new Set(ops.map((o) => o.stage)));
    return fromData.length ? fromData : defaults;
  }, [ops]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get<Opportunity[] | { items: Opportunity[] }>("/opportunities");
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray((res.data as any).items)
            ? (res.data as any).items
            : [];
        setOps(list);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el pipeline.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-sky-50 via-white to-blue-50 rounded-3xl">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-sky-700">Embudo</p>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline de oportunidades</h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full sm:w-auto">
          <select className="border border-sky-100 bg-white rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
            <option>Empresa: Todas</option>
            <option>TSales</option>
            <option>Vprime</option>
            <option>Infinet</option>
          </select>
          <select className="border border-sky-100 bg-white rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
            <option>Area: Todas</option>
            <option>PYME</option>
            <option>MASIVO</option>
          </select>
          <select className="border border-sky-100 bg-white rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
            <option>Segmento: Todos</option>
            <option>Fijo</option>
            <option>Movil</option>
            <option>Servicio Privado</option>
          </select>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {loading && (
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm">
          Cargando pipeline...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <Column key={stage} title={stage} items={ops.filter((o) => o.stage === stage)} />
        ))}
      </div>
    </div>
  );
}

function Column({
  title,
  items,
}: {
  title: string;
  items: Opportunity[];
}) {
  const total = items.reduce((sum, i) => sum + i.valor, 0);
  return (
    <div className="bg-white/90 border border-sky-100 rounded-2xl shadow-sm p-3 backdrop-blur">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 break-words">{title}</h3>
          <p className="text-xs text-slate-500">
            {items.length} op | ${total}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((op) => (
          <div
            key={op.id}
            className="p-3 rounded-xl border border-sky-100 bg-sky-50/60"
          >
            <p className="font-semibold text-slate-900">{op.cliente}</p>
            <p className="text-xs text-slate-600">Asesor: {op.asesor}</p>
            <p className="text-xs text-slate-600">Valor: ${op.valor}</p>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-slate-500 py-4 text-center">Sin oportunidades</p>
        )}
      </div>
    </div>
  );
}
