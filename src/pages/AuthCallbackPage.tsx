// src/pages/AuthCallbackPage
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { finalizarLogin } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const error = searchParams.get("error");

    if (error) {
      console.error("Error en el callback:", error);
      navigate(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!accessToken) {
      console.error("No se recibió accessToken.");
      navigate("/login?error=No+se+recibio+accessToken");
      return;
    }

    // 🔥 FINALIZA LOGIN PROPIAMENTE DICHO
    finalizarLogin(accessToken)
        .then(() => {
            navigate("/home"); // 🔥 Cambiado aquí
        })
        .catch((err) => {
            console.error("Error finalizando login:", err);
            navigate("/login?error=No+se+pudo+iniciar+sesion");
        });

  }, [searchParams, navigate, finalizarLogin]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Autenticando, por favor espera...
        </h1>
      </div>
    </div>
  );
}
