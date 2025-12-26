// src/features/opportunities/OpportunityFormPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

type FormState = {
  rut: string;
  razonSocial: string;
  supervisorId: string;
  advisorId: string;
  segmentId: string;
  serviceId: string;
  probability: number; // 0 | 25 | 50 | 75 | 100
  stateId: string; // OpportunityState id (CSO-Orden)
  status: string; // OPEN / WON / LOST
  fechaRespuesta: string;
  observaciones: string;
};

const initialState: FormState = {
  rut: "",
  razonSocial: "",
  supervisorId: "",
  advisorId: "",
  segmentId: "",
  serviceId: "",
  probability: 0,
  stateId: "",
  status: "OPEN",
  fechaRespuesta: "",
  observaciones: "",
};

type Option = { id: string; name: string; value?: string | number; label?: string };
type OptionsResponse = {
  segments: Option[];
  services: Option[];
  states: Option[];
  probabilities?: { value: string | number; label: string }[];
};

export default function OpportunityFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const isAdvisor = usuario?.role === "USER" || usuario?.role === "COMERCIAL";
  const activeSupervisorId = usuario?.activeAssignment?.supervisor?.userId || "";
  const activeSupervisorName = usuario?.activeAssignment?.supervisor?.name || "";
  const activeAdvisorName =
    usuario?.profile?.firstName ||
    usuario?.email ||
    usuario?.id ||
    "";
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<OptionsResponse>({
    segments: [],
    services: [],
    states: [],
    probabilities: [
      { value: 0, label: "0%" },
      { value: 25, label: "25%" },
      { value: 50, label: "50%" },
      { value: 75, label: "75%" },
      { value: 100, label: "100%" },
    ],
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await api.get<OptionsResponse>("/funnel/options");
        setOptions((prev) => ({
          ...prev,
          segments: res.data.segments ?? [],
          services: res.data.services ?? [],
          states: res.data.states ?? [],
          probabilities:
            res.data.probabilities?.map((p) => ({
              value:
                typeof p.value === "string"
                  ? Number(String(p.value).replace("P", "")) || 0
                  : Number(p.value),
              label: p.label,
            })) ?? prev.probabilities,
        }));
      } catch (err) {
        console.error("No se pudieron cargar opciones del funnel", err);
      }
    };
    void loadOptions();

    const load = async () => {
      if (!isEdit || !id) return;
      try {
        setLoading(true);
        const res = await api.get<{ opportunity: any }>(`/opportunities/${id}`);
        const o = res.data.opportunity ?? res.data;
        setForm({
          ...initialState,
          rut: o.rut ?? "",
          razonSocial: o.razonSocial ?? o.businessName ?? "",
          supervisorId: o.supervisorId ?? "",
          advisorId: o.advisorId ?? usuario?.id ?? "",
          segmentId: o.segmentId ?? "",
          serviceId: o.serviceId ?? "",
          probability:
            typeof o.probability === "number"
              ? o.probability
              : Number(String(o.probability).replace("P", "")) || 0,
          stateId: o.stateId ?? "",
          status: o.status ?? "OPEN",
          fechaRespuesta: o.responseDate
            ? o.responseDate.slice(0, 10)
            : "",
          observaciones: o.observaciones ?? o.notes ?? "",
        });
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la oportunidad.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id, isEdit, usuario?.id]);

  useEffect(() => {
    // Prefill supervisor/asesor desde asignación activa para asesores
    if (!isEdit && isAdvisor) {
      setForm((prev) => ({
        ...prev,
        advisorId: usuario?.id || "",
        supervisorId: activeSupervisorId,
      }));
    }
  }, [isEdit, isAdvisor, usuario?.id, activeSupervisorId]);

  const onChange = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        rut: form.rut,
        razonSocial: form.razonSocial,
        businessName: form.razonSocial,
        supervisorId: form.supervisorId || undefined,
        advisorId: form.advisorId || usuario?.id || undefined,
        segmentId: form.segmentId || undefined,
        serviceId: form.serviceId || undefined,
        probability: Number(form.probability),
        stateId: form.stateId || undefined,
        status: form.status as any,
        responseDate: form.fechaRespuesta || undefined,
        notes: form.observaciones || undefined,
      };
      if (isEdit && id) {
        await api.patch(`/opportunities/${id}`, payload);
      } else {
        await api.post("/opportunities", payload);
      }
      navigate("/oportunidades");
    } catch (err) {
      console.error(err);
      const message =
        (err as any)?.response?.data?.message || "No se pudo guardar la oportunidad.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <header className="space-y-1">
        <p className="text-sm text-gray-500">Oportunidades</p>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Editar oportunidad" : "Nueva oportunidad"}
        </h1>
        <p className="text-gray-600">
          Captura datos del cliente, asignaciones y etapa del funnel.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}
      {loading && <p className="text-sm text-gray-600">Cargando...</p>}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5"
        onSubmit={onSubmit}
      >
        <div>
          <label className="text-sm font-semibold text-gray-700">RUT</label>
          <input
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.rut}
            onChange={(e) => onChange("rut", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Razón social</label>
          <input
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.razonSocial}
            onChange={(e) => onChange("razonSocial", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Supervisor</label>
          {isAdvisor ? (
            <div className="mt-1 px-3 py-2 text-sm border rounded-lg bg-gray-50 text-gray-700">
              {activeSupervisorName || "Asignado automáticamente"}
            </div>
          ) : (
            <input
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Autocompletar"
              value={form.supervisorId}
              onChange={(e) => onChange("supervisorId", e.target.value)}
            />
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Asesor</label>
          {isAdvisor ? (
            <div className="mt-1 px-3 py-2 text-sm border rounded-lg bg-gray-50 text-gray-700">
              {activeAdvisorName}
            </div>
          ) : (
            <input
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Autocompletar"
              value={form.advisorId}
              onChange={(e) => onChange("advisorId", e.target.value)}
            />
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Segmento</label>
          <select
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.segmentId}
            onChange={(e) => onChange("segmentId", e.target.value)}
            required
          >
            <option value="">Selecciona segmento</option>
            {options.segments.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Tipo de servicio</label>
          <select
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.serviceId}
            onChange={(e) => onChange("serviceId", e.target.value)}
            required
          >
            <option value="">Selecciona servicio</option>
            {options.services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Probabilidad</label>
          <select
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.probability}
            onChange={(e) => onChange("probability", Number(e.target.value))}
          >
            {(options.probabilities ?? []).map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">CSO-Orden (Etapa)</label>
          <select
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.stateId}
            onChange={(e) => onChange("stateId", e.target.value)}
            required
          >
            <option value="">Selecciona etapa</option>
            {options.states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Estado global</label>
          <select
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <option value="OPEN">Abierta</option>
            <option value="WON">Ganada</option>
            <option value="LOST">Perdida</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Fecha respuesta</label>
          <input
            type="date"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            value={form.fechaRespuesta}
            onChange={(e) => onChange("fechaRespuesta", e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Observaciones</label>
          <textarea
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            rows={4}
            placeholder="Notas internas"
            value={form.observaciones}
            onChange={(e) => onChange("observaciones", e.target.value)}
          />
        </div>
        <div className="md:col-span-2 flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>

    </div>
  );
}
