import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";
import { useNavigate } from "react-router-dom";

import "./SelectTheme.css";
import { useState } from "react";
import ThemeMenu from "../../components/menu/ThemeMenu";

const SelectTheme = ({ currentComponent, setCurrentComponent }) => {
  const url = `/theme`;

  const [isThemeMenu, setThemeMenu] = useState(false);

  const navigate = useNavigate();

  function showCreateQuestion(id) {
    setCurrentComponent(currentComponent + 1);
    navigate(`/create/quiz/${id}`);
  }

  return (
    <div className="container-select-theme">
      <div className="add-theme-btn">
        <i
          className="bi bi-plus-circle-fill"
          onClick={() => setThemeMenu(true)}
        ></i>
      </div>

      <ThemeTemplate url={url} onClickFunction={showCreateQuestion} />

      {isThemeMenu && <ThemeMenu setThemeMenu={setThemeMenu} />}
    </div>
  );
};

export default SelectTheme;
