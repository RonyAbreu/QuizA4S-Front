// Components
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";

// Css
import "./App.css";
import { useContext } from "react";
import { AuthenticationContext } from "./context/AutenticationContext";
import Loading from "./components/loading/Loading";

export const URL_BASE = "http://api.observatorioturismopb.com.br:8085/api/v1";

function App() {
  const { isAuthenticated, loading } = useContext(AuthenticationContext);

  return (
    <div className="app">
      {loading && <Loading />}
      <Header isAuth={isAuthenticated} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
