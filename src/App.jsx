// Components
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";

// Css
import "./App.css";
import { useContext, useState } from "react";
import { AuthenticationContext } from "./context/AutenticationContext";
import UpdateBox from "./components/updateBox/UpdateBox";

export const URL_BASE = "http://api.observatorioturismopb.com.br:8085/api/v1";

function App() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  const [value, setValue] = useState("");

  const inputs = [
    {
      label: "Novo nome",
      type: "text",
      placeholder: "Digite seu novo nome",
      value: value,
    },
    {
      label: "Novo nome",
      type: "text",
      placeholder: "Digite seu novo nome",
      value: value,
    },
    {
      label: "Novo nome",
      type: "text",
      placeholder: "Digite seu novo nome",
      value: value,
    },
    {
      label: "Novo nome",
      type: "text",
      placeholder: "Digite seu novo nome",
      value: value,
    },

  ];

  console.log(value)

  return (
    <div className="app">
      <Header isAuth={isAuthenticated} />
      <UpdateBox inputs={inputs} onChange={setValue} title="Hello docker"/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
