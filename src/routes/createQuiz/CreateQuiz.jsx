import { useState } from "react";
import ThemeMenu from "../../components/menu/ThemeMenu";

//Css
import "./CreateQuiz.css";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {

  const [activeThemeMenu, setThemeMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container-create-quiz">
      <div className="container-create">
        <div className="container-create-header">
          <h2>Crie ou Selecione um Tema</h2>
        </div>

        <div className="container-create-buttons">
          <div className="create-btn" onClick={() => setThemeMenu(true)}>
            <h2>Criar Tema</h2>
          </div>

          <div className="create-btn" onClick={() => navigate("/create/quiz/theme")}>
            <h2>Selecionar Tema</h2>
          </div>
        </div>
      </div>

      {activeThemeMenu && <ThemeMenu setThemeMenu={setThemeMenu}/>}
    </div>
  );
};

export default CreateQuiz;
