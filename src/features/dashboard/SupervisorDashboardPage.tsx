import { useEffect, useState } from "react";
import api from "../../services/api";

type BarRow = { advisorId: string; name: string; count: number };
type PieRow = { label: string; value: number };
type Recent = { id: string; cliente: string; stage: string; advisorName: string; updatedAt: string };

interface DashboardResponse {
  openCount: number;
  totalValue: number;
  avgTicket?: number;
  barByAdvisor: BarRow[];
  pieByServiceType: PieRow[];
  recent: Recent[];
}

export default function SupervisorDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get<DashboardResponse>("/dashboard/supervisor");
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el dashboard de supervisor.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const bar = data?.barByAdvisor ?? [];
  const pie = data?.pieByServiceType ?? [];
  const maxBarValue = Math.max(...bar.map((row) => row.count), 1);

  return (
    <div className="relative max-w-7xl mx-auto p-4 sm:p-6 space-y-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-64 bg-gradient-to-r from-sky-200/40 via-white to-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-12 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

      <header className="relative space-y-2">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Supervisor</h1>
        <p className="text-slate-600">Resumen del equipo por ケrea/segmento.</p>
      </header>

      {error && (
        <div className="relative bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}
      {loading && (
        <div className="relative inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm">
          Cargando dashboard...
        </div>
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPI label="Oportunidades abiertas" value={data?.openCount ?? "-"} tone="sky" />
        <KPI label="Ventas totales" value={data?.totalValue ?? "-"} tone="cyan" />
        <KPI
          label="Ticket promedio"
          value={data?.avgTicket ? `$${data.avgTicket}` : "-"}
          tone="blue"
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Oportunidades por asesor">
          <div className="space-y-2">
            {bar.map((row) => (
              <div key={row.advisorId} className="flex items-center gap-2">
                <div className="w-24 text-sm text-slate-700">{row.name}</div>
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500"
                    style={{ width: `${(row.count / maxBarValue) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-sm text-slate-700 text-right">{row.count}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="DistribuciИn por tipo de servicio">
          <div className="space-y-2">
            {pie.map((slice) => (
              <div key={slice.label} className="flex justify-between text-sm">
                <span className="text-slate-700">{slice.label}</span>
                <span className="font-semibold text-slate-900">{slice.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="れltimas oportunidades">
        <ul className="text-sm text-slate-700 space-y-1">
          {(data?.recent ?? []).map((r) => (
            <li key={r.id}>
              {r.cliente} 嫉 {r.stage} 嫉 {r.advisorName}
            </li>
          ))}
          {(!data || (data.recent?.length ?? 0) === 0) && <li>Sin movimientos recientes.</li>}
        </ul>
      </Card>

    </div>
  );
}

function KPI({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "sky" | "cyan" | "blue";
}) {
  const toneMap = {
    sky: "bg-sky-50 text-sky-800 border-sky-100",
    cyan: "bg-cyan-50 text-cyan-800 border-cyan-100",
    blue: "bg-blue-50 text-blue-800 border-blue-100",
  } as const;
  return (
    <div className={`p-4 rounded-2xl border ${toneMap[tone]} shadow-sm backdrop-blur`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/90 border border-sky-100 rounded-2xl shadow-sm p-4 backdrop-blur">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}
