import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
