// Components
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

// Css
import "./App.css";
import { useContext } from "react";
import { AuthenticationContext } from "./context/AutenticationContext";

export const URL_BASE = "http://api.observatorioturismopb.com.br:8085/api/v1";

function App() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <div className="app">
      <Header isAuth={isAuthenticated} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
