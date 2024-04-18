import { useNavigate } from "react-router-dom";
import ImageNotFound from "../../assets/not-found-img.jpg"

import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container-erro outlet">
      <div className="container-data">
        <h1>Ops! Página não encontrada</h1>
        <img src={ImageNotFound} alt="img-not-found" />
        <button type="button" onClick={() => navigate("/")}>Voltar ao Ínicio</button>
      </div>
    </div>
  );
};

export default ErrorPage;
