// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { startAuth } from "../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { redirectUrl } = await startAuth(email);
      window.location.href = redirectUrl;
    } catch (err: any) {
      setError(err.message || "Ocurrio un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-blue-200 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/90 rounded-2xl p-8 shadow-xl border border-sky-100 backdrop-blur"
      >
        <img src="/img/TVI.jpg" className="w-24 mx-auto mb-4 rounded-xl shadow-lg" alt="Logo TVI" />
        <h1 className="text-center text-2xl font-bold text-slate-800 mb-1">
          Bienvenido a TVI
        </h1>
        <p className="text-center text-slate-500 mb-6">
          Ingresa tu correo para iniciar sesion
        </p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-slate-600 text-sm font-medium">Correo electronico</label>
            <input
              type="email"
              placeholder="tu.correo@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border rounded-xl border-sky-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              required
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 hover:from-blue-800 hover:to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Redirigiendo..." : "Continuar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
