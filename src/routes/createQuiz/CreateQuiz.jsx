import { useState } from "react";
import ThemeMenu from "../../components/menu/ThemeMenu";
import createBtnImg from "../../assets/create-theme-btn.webp";
import selectBtnImg from "../../assets/select-theme-btn.webp";

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
            <img src={createBtnImg} alt="img-create-quiz" width="300" height="300"></img>
          </div>

          <div className="create-btn" onClick={() => navigate("/create/quiz/theme")}>
            <h2>Selecionar Tema</h2>
            <img src={selectBtnImg} alt="img-select-quiz" width="300" height="300"></img>
          </div>
        </div>
      </div>

      {activeThemeMenu && <ThemeMenu setThemeMenu={setThemeMenu}/>}
    </div>
  );
};

export default CreateQuiz;
