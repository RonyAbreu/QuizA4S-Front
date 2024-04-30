import { useNavigate } from "react-router-dom";
import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";

import "./SelectTheme.css";
import { useState } from "react";

const SelectTheme = () => {
  const [baseUrl, setBaseUrl] = useState("/theme");
  const navigate = useNavigate();

  function showCreateQuestion(theme) {
    localStorage.setItem("theme", JSON.stringify(theme));
    navigate(`/create/quiz/${theme.id}/question`)
  }

  return (
    <div className="container-select-theme">

      <ThemeTemplate baseUrl={baseUrl} onClickFunction={showCreateQuestion} setBaseUrl={setBaseUrl} />

    </div>
  );
};

export default SelectTheme;
