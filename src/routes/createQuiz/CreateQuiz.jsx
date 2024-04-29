import { useState } from "react";
import ThemeMenu from "../../components/menu/ThemeMenu";

//Css
import "./CreateQuiz.css";

const CreateQuiz = () => {

  const [activeThemeMenu, setThemeMenu] = useState(false);

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

          <div className="create-btn">
            <h2>Selecionar Tema</h2>
          </div>
        </div>
      </div>

      {activeThemeMenu && <ThemeMenu setThemeMenu={setThemeMenu}/>}
    </div>
  );
};

export default CreateQuiz;
