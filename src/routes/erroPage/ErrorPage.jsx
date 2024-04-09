import "./ErrorPage.css";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const routerError = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="container-erro outlet">
      <div className="container-data">
        <h1 className="title-erro">Ops! Página não encontrada</h1>
        <p>{routerError.status}</p>
        <p>{routerError.statusText}</p>
        <button type="button" onClick={() => navigate("/")}>Voltar ao Ínicio</button>
      </div>
    </div>
  );
};

export default ErrorPage;
