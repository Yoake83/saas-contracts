import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("mock_jwt"));

  useEffect(() => {
    if (token) localStorage.setItem("mock_jwt", token);
    else localStorage.removeItem("mock_jwt");
  }, [token]);

  const login = ({ username, password }) => {
    // mock auth: accept any username and password "test123"
    if (password === "test123") {
      const mockToken = btoa(`${username}:mock-jwt`);
      setToken(mockToken);
      return { ok: true };
    }
    return { ok: false, message: "Password must be test123" };
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
