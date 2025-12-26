import { Link } from "react-router-dom";
import { Building2, LayoutDashboard, Settings, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function HomeSuperAdmin() {
  const { usuario } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-sky-700 font-semibold">Rol: Super Admin</p>
          <h1 className="text-3xl font-bold text-sky-800">
            Hola, {usuario?.profile?.firstName || usuario?.email}
          </h1>
          <p className="text-slate-600">
            Administra empresas, estructura y usuarios desde un solo lugar.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ActionCard
          title="Estructura"
          description="Empresas, áreas y segmentos"
          to="/admin/estructura"
          icon={<Building2 className="text-sky-700" size={28} />}
          tone="sky"
        />
        <ActionCard
          title="Usuarios y roles"
          description="Supervisores y asesores"
          to="/admin/usuarios"
          icon={<Settings className="text-blue-700" size={28} />}
          tone="blue"
        />
        <ActionCard
          title="Oportunidades"
          description="Ver y gestionar oportunidades"
          to="/oportunidades"
          icon={<Sparkles className="text-cyan-600" size={28} />}
          tone="cyan"
        />
        <ActionCard
          title="Dashboard"
          description="KPIs consolidadas"
          to="/dashboard/supervisor"
          icon={<LayoutDashboard className="text-sky-600" size={28} />}
          tone="sky2"
        />
      </section>
    </div>
  );
}

function ActionCard({
  title,
  description,
  icon,
  to,
  tone,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  tone: "sky" | "blue" | "cyan" | "sky2";
}) {
  const toneMap = {
    sky: "hover:border-sky-200 hover:bg-sky-50",
    blue: "hover:border-blue-200 hover:bg-blue-50",
    cyan: "hover:border-cyan-200 hover:bg-cyan-50",
    sky2: "hover:border-sky-200 hover:bg-sky-50",
  } as const;

  return (
    <Link
      to={to}
      className={`p-5 rounded-2xl border border-sky-100 bg-white/90 shadow-sm backdrop-blur transition ${toneMap[tone]}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white border border-sky-100 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
