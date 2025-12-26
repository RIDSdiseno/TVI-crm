// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import api, {
  setAccessToken as setApiAccessToken,
  startAuth,
} from "../services/api";

// ==============================
// Tipos de ayuda
// ==============================

export type AssignmentRole =
  | "SUPER_ADMIN"
  | "RRHH_GLOBAL"
  | "ADMIN_EMPRESA"
  | "GERENTE_UNIDAD"
  | "BACKOFFICE"
  | "SOPORTE"
  | "COMERCIAL"
  | "USER";

export type BusinessUnitType = "PYME" | "MASIVO";

export type ServiceLineType = "FIJO" | "MOVIL" | "SERVICIO_PRIVADO";

export interface CompanySummary {
  id: string;
  name: string;
  code: string;
  domain?: string;
}

export interface UserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  rut: string | null;
  jobTitle: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentSupervisor {
  userId: string;
  email: string;
  name: string;
  assignmentId: string | null;
}

export interface Assignment {
  id: string;
  role: AssignmentRole;
  company: {
    id: string;
    name: string;
    code: string;
  } | null;
  businessUnit: {
    id: string;
    name: string;
    type: BusinessUnitType;
  } | null;
  serviceLine: {
    id: string;
    name: string;
    type: ServiceLineType;
  } | null;
  supervisor: AssignmentSupervisor | null;
}

export interface Usuario {
  id: string;
  email: string;
  role: AssignmentRole;
  authProvider: "LOCAL" | "GOOGLE" | "MICROSOFT";
  companyId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  company: CompanySummary | null;
  profile: UserProfile | null;
  assignments: Assignment[];
  activeAssignment: Assignment | null;
}

export interface AuthContextType {
  usuario: Usuario | null;
  accessToken: string | null;
  cargando: boolean;
  loginWithEmail: (email: string) => Promise<void>;
  finalizarLogin: (accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ==============================
// Contexto
// ==============================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  // Helper para limpiar sesión de forma consistente
  const clearSession = () => {
    setUsuario(null);
    setAccessTokenState(null);
    setApiAccessToken(null);
    localStorage.removeItem("access_token");
  };

  // Al montar la app: intentar restaurar sesión desde localStorage
  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("access_token");

      if (!storedToken) {
        setCargando(false);
        return;
      }

      try {
        setAccessTokenState(storedToken);
        setApiAccessToken(storedToken);

        const res = await api.get<{ user: Usuario }>("/auth/me");
        setUsuario(res.data.user);
      } catch (error) {
        console.error("Error al restaurar sesión desde /auth/me:", error);
        clearSession();
      } finally {
        setCargando(false);
      }
    };

    void init();
  }, []);

  // Inicia el flujo SSO (Google/Microsoft) según el email
  const loginWithEmail = async (email: string): Promise<void> => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      throw new Error("El correo es obligatorio");
    }

    const { redirectUrl } = await startAuth(trimmed);
    // Redirección al proveedor (Google/Microsoft)
    window.location.href = redirectUrl;
  };

  // Finaliza el login después del callback OAuth: guarda token y trae /auth/me
  const finalizarLogin = async (token: string): Promise<void> => {
    if (!token) {
      throw new Error("Access token inválido");
    }

    try {
      setCargando(true);

      // Guardar token en memoria y en localStorage
      setAccessTokenState(token);
      setApiAccessToken(token);
      localStorage.setItem("access_token", token);

      // Cargar datos del usuario actual
      const res = await api.get<{ user: Usuario }>("/auth/me");
      setUsuario(res.data.user);
    } catch (error) {
      console.error("Error en finalizarLogin (/auth/me):", error);
      clearSession();
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Logout: avisa al backend y limpia sesión local
  const logout = async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error en logout (backend):", error);
      // Aunque falle el backend, limpiamos la sesión local igual
    } finally {
      clearSession();
    }
  };

  const value: AuthContextType = {
    usuario,
    accessToken,
    cargando,
    loginWithEmail,
    finalizarLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook de conveniencia
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return ctx;
};
