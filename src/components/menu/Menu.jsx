import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";

import "./Menu.css";

const Menu = ({ setMenu, isAuth }) => {
  const { setAuthenticated } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  function handleButtonClick(callback) {
    setMenu(false);
    callback();
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

      {isAuth && (
        <div className="container-btns">
          <button type="button" onClick={() => handleButtonClick(() => navigate("/"))}>
            Jogar
          </button>
          <button type="button" onClick={() => handleButtonClick(() => navigate("/profile"))}>
            Meu Perfil
          </button>
          <button type="button" onClick={() => handleButtonClick(createQuiz)}>
            Criar Quiz
          </button>
          <button type="button" onClick={() => handleButtonClick(logout)}>
            Sair
          </button>
        </div>
      )}

      {!isAuth && (
        <div className="container-btns">
          <button type="button" onClick={() => handleButtonClick(() => navigate("/"))}>
            Jogar
          </button>
          <button type="button" onClick={() => handleButtonClick(() => navigate("/register"))}>
            Cadastrar-se
          </button>
          <button type="button" onClick={() => handleButtonClick(() => navigate("/login"))}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
