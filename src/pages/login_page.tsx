import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const fakeUsers = [
  { email: "admin@tvi.cl", pass: "admin123", role: "admin" },
  { email: "soporte@tvi.cl", pass: "1234", role: "soporte" },
  { email: "ventas@tvi.cl", pass: "ventas", role: "comercial" },
  { email: "root@system.dev", pass: "root123", role: "super" }, // 🔥 SUPER ADMIN
  { email: "admin@tvi.cl", pass: "admin123", role: "admin" },
  { email: "soporte@tvi.cl", pass: "1234", role: "soporte" },
  { email: "ventas@tvi.cl", pass: "ventas", role: "comercial" },
];

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const user = fakeUsers.find((u) => u.email === email && u.pass === pwd);

    if (!user) {
      setError("Credenciales incorrectas");
      return;
    }

    // Guardar usuario completo
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/seleccion-empresa";
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-red-50 to-yellow-50">
      {/* ANIMATED BACKGROUND CIRCLES */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 3 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-72 h-72 bg-blue-200 rounded-full opacity-30 top-[-80px] left-[-80px]"
      ></motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 3 }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-80 h-80 bg-red-200 rounded-full opacity-30 bottom-[60px] right-[30px]"
      ></motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 2.6 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-96 h-96 bg-yellow-200 rounded-full opacity-30 bottom-[-120px] left-[-20px]"
      ></motion.div>

      {/* CARD BOX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[430px] bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
      >
        <img
          src="/img/TVI.jpg"
          className="w-24 mx-auto mb-4 rounded-xl shadow-lg"
        />

        <h1 className="text-center text-2xl font-bold text-gray-700 mb-6 tracking-wide">
          Bienvenido a TVI
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-gray-600 text-sm font-medium">Correo</label>
            <input
              type="email"
              placeholder="ejemplo@tvi.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium">
              Contraseña
            </label>
            <div className="flex items-center mt-1 border rounded-xl border-gray-300 px-3">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="w-full py-2 focus:outline-none"
                required
              />
              <button
                type="button"
                className="text-blue-500 text-sm"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            Ingresar
          </button>
        </form>

        {/* Empresas debajo */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Acceso empresas
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <img
            src="/img/T.jpg"
            className="w-12 h-12 rounded-lg shadow-md hover:scale-110 transition"
          />
          <img
            src="/img/V.jpg"
            className="w-12 h-12 rounded-lg shadow-md hover:scale-110 transition"
          />
          <img
            src="/img/I.jpg"
            className="w-12 h-12 rounded-lg shadow-md hover:scale-110 transition"
          />
        </div>
      </motion.div>
    </div>
  );
}
