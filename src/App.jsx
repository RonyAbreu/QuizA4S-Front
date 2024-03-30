// Components
import Header from "./components/Header";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Footer from "./components/Footer";

// Css
import "./App.css";
import { useEffect, useState } from "react";

export const URL_BASE = "http://api.observatorioturismopb.com.br:8085/api/v1";

function App() {
  const [home, setHome] = useState(false);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(true);

  const path = useLocation().pathname;

  useEffect(() => {
    if (path.startsWith("/user")) {
      setHome(true);
      setRegister(true);
      setLogin(true);
      setProfile(false);
    } else {
      setHome(false);
      setRegister(false);
      setLogin(false);
      setProfile(true);
    }
  }, [path]);

  return (
    <div className="app">
      <Header home={home} register={register} login={login} profile={profile} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
