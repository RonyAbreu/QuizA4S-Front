import { createContext, useState, useEffect } from "react";
import { URL_BASE } from "../App";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function checkToken() {
      setLoading(true);
      const response = await fetch(`${URL_BASE}/user/find`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.clear();
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      setLoading(false);
      const userDetails = await response.json()
      localStorage.setItem("user", JSON.stringify(userDetails))

      setAuthenticated(true);
    }

    checkToken();
  }, [token]);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setAuthenticated, loading }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
