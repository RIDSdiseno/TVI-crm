import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const fakeUsers = [
      { email: "admin@tvi.cl", pass: "admin123", role: "admin" },
      { email: "soporte@tvi.cl", pass: "1234", role: "soporte" },
      { email: "ventas@tvi.cl", pass: "ventas", role: "comercial" },
    ];

    const found = fakeUsers.find(
      (u) => u.email === email && u.pass === password
    );

    if (!found) return false;

    setUser(found);
    localStorage.setItem("user", JSON.stringify(found));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
