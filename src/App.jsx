// Components
import Header from "./components/Header";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Footer from "./components/Footer";

// Css
import "./App.css";
import { useState } from "react";


export const URL_BASE = "http://api.observatorioturismopb.com.br:8085/api/v1";

function App() {

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
