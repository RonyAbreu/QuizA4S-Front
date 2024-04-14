import { createContext, useState, useEffect } from "react";
import { URL_BASE } from "../App";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function checkToken() {
      const response = await fetch(`${URL_BASE}/user/find`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        setAuthenticated(false);
        return;
      }

      const userDetails = await response.json()
      localStorage.setItem("user", JSON.stringify(userDetails))

      setAuthenticated(true);
    }

    checkToken();
  }, [token]);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
