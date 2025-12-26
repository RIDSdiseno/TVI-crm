// src/services/api.ts
import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

// ======================================================
// Estado interno del access token
// ======================================================
let accessToken: string | null = null;

/**
 * Permite que otras partes de la app (AuthContext, etc.)
 * actualicen el access token que se enviará en cada request.
 */
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

/**
 * Útil si en algún momento quieres leer el token actual.
 */
export const getAccessToken = () => accessToken;

// ======================================================
// Instancia principal de Axios
// ======================================================
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // necesario para que viaje la cookie httpOnly de refresh_token
});

// ======================================================
// Interceptor de REQUEST: agrega Authorization Bearer
// ======================================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ======================================================
// Lógica de refresh de token (una sola petición a la vez)
// ======================================================
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  // Si ya hay un refresh en curso, reutilizamos esa promesa
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = axios
    .post<{ access_token: string }>(
      `${API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    )
    .then((res) => {
      const newToken = res.data.access_token;
      if (newToken) {
        setAccessToken(newToken);
        // Opcional: también podrías guardar aquí en localStorage,
        // pero normalmente eso lo maneja el AuthContext.
      }
      return newToken ?? null;
    })
    .catch((err) => {
      console.error("Error al refrescar access token:", err);
      setAccessToken(null);
      return null;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

// ======================================================
// Interceptor de RESPONSE: maneja 401 y refresca token
// ======================================================
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Si no hay respuesta o no es 401, devolvemos el error normal
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Evitar loops infinitos con el propio endpoint de refresh
    const isRefreshCall =
      originalRequest?.url &&
      typeof originalRequest.url === "string" &&
      originalRequest.url.includes("/auth/refresh");

    if (isRefreshCall) {
      // Si incluso el refresh devuelve 401/errores,
      // dejamos que el AuthContext se encargue de hacer logout.
      return Promise.reject(error);
    }

    // Evitar reintentar múltiples veces la misma request
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // Intentar refrescar el token
    const newToken = await refreshAccessToken();

    if (!newToken) {
      // No se pudo refrescar → propagamos el error y el frontend
      // (AuthContext) debería limpiar sesión y mandar al login.
      return Promise.reject(error);
    }

    // Reintentamos la request original con el nuevo token
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
    }

    return api(originalRequest);
  }
);

// ======================================================
// Funciones de ayuda específicas de tu backend
// ======================================================

/**
 * Inicia el flujo de autenticación dinámico:
 * POST /api/auth/start con el email.
 *
 * El backend responde con { redirectUrl }, que debe usarse
 * para redirigir al proveedor (Google/Microsoft).
 */
export const startAuth = async (
  email: string
): Promise<{ redirectUrl: string }> => {
  const res = await api.post<{ redirectUrl: string }>("/auth/start", {
    email,
  });
  return res.data;
};

// Puedes seguir usando `api` directamente en el resto de la app
export default api;
