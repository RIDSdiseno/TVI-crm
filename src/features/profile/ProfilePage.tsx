import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <div className="p-4 sm:p-6">Sin usuario cargado.</div>;
  }

  const profile = usuario.profile || {};
  const rows = [
    { label: "Nombre", value: `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() || "-" },
    { label: "RUT", value: profile.rut ?? "-" },
    { label: "Cargo", value: profile.jobTitle ?? "-" },
    { label: "Teléfono", value: profile.phone ?? "-" },
    { label: "Rol", value: usuario.role },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-3xl">
      <header className="space-y-1">
        <p className="text-sm text-sky-700 font-semibold">Perfil</p>
        <h1 className="text-2xl font-bold text-slate-900">
          {profile.firstName || usuario.email}
        </h1>
        <p className="text-slate-600">{usuario.email}</p>
      </header>

      <div className="bg-white/90 border border-sky-100 rounded-2xl shadow-sm p-4 backdrop-blur">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Datos</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-700">
          {rows.map((row) => (
            <div key={row.label} className="space-y-0.5">
              <dt className="text-xs uppercase text-slate-500">{row.label}</dt>
              <dd className="text-sm font-medium text-slate-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
