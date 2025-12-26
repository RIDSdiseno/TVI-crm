import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Clock3, Loader2, Sparkles, TrendingUp } from "lucide-react";
import api from "../../services/api";

type TaskRow = { id: string; text: string; dueDate?: string };

interface AdvisorDashboardResponse {
  myOpen: number;
  tasks: TaskRow[];
}

export default function AdvisorDashboardPage() {
  const [data, setData] = useState<AdvisorDashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get<AdvisorDashboardResponse>("/dashboard/advisor");
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el dashboard del asesor.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const tasks = data?.tasks ?? [];

  return (
    <div className="relative min-h-[calc(100vh-120px)] overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <div className="pointer-events-none absolute inset-x-0 -top-48 h-72 bg-gradient-to-r from-sky-200/50 via-white to-blue-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-blue-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase text-sky-700 shadow-sm backdrop-blur">
              <Sparkles size={14} />
              Dashboard asesor
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-900">
                <h1 className="text-3xl font-semibold">Asesor en foco</h1>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  Vista personal
                </span>
              </div>
              <p className="max-w-2xl text-sm text-slate-600">
                Visualiza tus oportunidades abiertas y tus tareas para avanzar clientes sin ruido.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="rounded-full border border-sky-200 bg-white/80 px-3 py-1 shadow-sm text-sky-800">
                {tasks.length} tareas activas
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5">
              <Sparkles size={16} />
              Crear oportunidad
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700">
              Ver pipeline
              <ArrowRight size={16} />
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}
        {loading && (
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm">
            <Loader2 size={16} className="animate-spin" />
            Cargando dashboard...
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <KPI
            label="Oportunidades abiertas"
            value={data?.myOpen ?? "-"}
            icon={TrendingUp}
            accent="sky"
          />
          <KPI label="Tareas activas" value={tasks.length} icon={Clock3} accent="emerald" />
          <KPI label="Prioridad" value="Oportunidades" icon={Sparkles} accent="amber" />
        </div>

        <Card
          title="Recordatorios / tareas"
          description="Tus proximos to-dos para no perder ritmo con clientes."
        >
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-white/80 px-3 py-3 shadow-sm"
              >
                <div className="mt-0.5 rounded-xl bg-sky-50 p-2 text-sky-700">
                  {task.dueDate ? <Clock3 size={16} /> : <CheckCircle2 size={16} />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{task.text}</p>
                  {task.dueDate && <p className="text-xs text-slate-500">Vence {task.dueDate}</p>}
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="rounded-2xl border border-dashed border-sky-200 bg-white/80 px-4 py-5 text-sm text-slate-600">
                Sin tareas pendientes. Aprovecha para adelantar prospeccion o preparar la siguiente
                reunion.
              </div>
            )}
          </div>
        </Card>

        <Card
          title="Atajos"
          description="Acciones rapidas para mantener el impulso."
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button className="flex items-center justify-between rounded-2xl border border-sky-200 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5">
              Crear oportunidad
              <ArrowRight size={16} />
            </button>
            <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
              Ver mi pipeline
              <TrendingUp size={16} />
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: ComponentType<{ size?: number }>;
  accent: "sky" | "emerald" | "amber";
}) {
  const accentMap = {
    sky: "from-sky-50 via-white to-white",
    emerald: "from-emerald-50 via-white to-white",
    amber: "from-amber-50 via-white to-white",
  } as const;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:shadow-lg">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent]} opacity-90`} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-50/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="rounded-xl bg-white/80 p-3 text-slate-700 shadow-sm">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  className = "",
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50" />
      <div className="absolute inset-0 bg-white/40" />
      <div className="relative space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-slate-600">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
