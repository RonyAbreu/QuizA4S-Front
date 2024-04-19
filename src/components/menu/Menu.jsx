import { useContext } from "react";
import { AuthenticationContext } from "../../context/AutenticationContext";
import { useNavigate } from "react-router-dom";

import "./Menu.css";

const Menu = ({ setMenu }) => {
  const { setAuthenticated } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenu(false);
    setAuthenticated(false);
    navigate("/login");
  }

  function createQuiz() {
    navigate("/create/quiz");
  }

  return (
    <div className="menu">
      <div className="container-btn-fechar">
        <button type="button" onClick={() => setMenu(false)}>
          X
        </button>
      </div>

      <div className="container-btns">
        <button type="button" onClick={() => navigate("/")}>
          Jogar
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          Meu Perfil
        </button>
        <button type="button" onClick={() => navigate("/myquiz")}>
          Meus Quizzes
        </button>
        <button type="button" onClick={createQuiz}>
          Criar Quiz
        </button>
        <button type="button" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Menu;
