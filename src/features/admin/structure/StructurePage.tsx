import { useEffect, useState } from "react";
import api from "../../../services/api";

type Company = { id: string; name: string; code: string };
type Area = { id: string; name: string; type: string; companyId: string };
type Segment = { id: string; name: string; type: string; areaId: string };

export default function StructurePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const res = await api.get<Company[]>("/companies");
        setCompanies(res.data);
        if (res.data.length > 0 && !selectedCompany) {
          setSelectedCompany(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las empresas.");
      } finally {
        setLoading(false);
      }
    };
    void loadCompanies();
  }, []);

  useEffect(() => {
    if (!selectedCompany) return;
    const loadAreas = async () => {
      try {
        setLoading(true);
        const res = await api.get<Area[]>(`/companies/${selectedCompany}/areas`);
        setAreas(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las areas.");
      } finally {
        setLoading(false);
      }
    };
    void loadAreas();
  }, [selectedCompany]);

  useEffect(() => {
    const loadSegments = async () => {
      try {
        const all: Segment[] = [];
        await Promise.all(
          areas.map(async (area) => {
            const res = await api.get<Segment[]>(`/areas/${area.id}/segments`);
            res.data.forEach((s) => all.push({ ...s, areaId: area.id }));
          })
        );
        setSegments(all);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los segmentos.");
      }
    };
    if (areas.length > 0) {
      void loadSegments();
    } else {
      setSegments([]);
    }
  }, [areas]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-sky-700 font-semibold">Estructura</p>
          <h1 className="text-2xl font-bold text-slate-900">Empresas | Áreas | Segmentos</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {companies.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCompany(c.id)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                selectedCompany === c.id
                  ? "bg-sky-100 border-sky-200 text-sky-800"
                  : "bg-white border-sky-100 text-slate-700 hover:bg-sky-50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {loading && <div className="text-sm text-slate-600">Cargando datos de estructura...</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Empresas" actionLabel="Nueva empresa" onAction={() => null}>
          <Table headers={["Nombre", "Codigo"]} rows={companies.map((c) => [c.name, c.code])} />
        </Card>

        <Card title="Areas" actionLabel="Agregar area" onAction={() => null}>
          <Table headers={["Nombre", "Tipo"]} rows={areas.map((a) => [a.name, a.type])} />
        </Card>

        <Card title="Segmentos" actionLabel="Agregar segmento" onAction={() => null}>
          <Table headers={["Nombre", "Tipo"]} rows={segments.map((s) => [s.name, s.type])} />
        </Card>
      </div>

      <Callout />
    </div>
  );
}

function Card({
  title,
  actionLabel,
  onAction,
  children,
}: {
  title: string;
  actionLabel: string;
  onAction: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/90 border border-sky-100 rounded-2xl shadow-sm p-4 h-full flex flex-col backdrop-blur">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <button
          onClick={onAction}
          className="text-sm px-3 py-1.5 rounded-lg border border-sky-100 text-sky-700 hover:bg-sky-50"
        >
          {actionLabel}
        </button>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-sky-100 rounded-xl">
      <table className="w-full min-w-[420px] text-sm">
        <thead className="bg-sky-50 text-left">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold text-slate-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t">
              {row.map((cell, i) => (
                <td key={i} className="px-3 py-2 text-slate-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={headers.length} className="px-3 py-3 text-slate-500">
                Sin registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Callout() {
  return (
    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-sm text-sky-800">
      Esta vista usa:
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>GET /companies</li>
        <li>GET /companies/:id/areas</li>
        <li>GET /areas/:id/segments</li>
      </ul>
      Agrega POST en estas rutas para crear registros desde el front cuando este el flujo de formularios.
    </div>
  );
}
