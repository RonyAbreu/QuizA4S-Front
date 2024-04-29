import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";

import "./SelectTheme.css";
import { useState } from "react";

const SelectTheme = () => {
  const [baseUrl, setBaseUrl] = useState("/theme");

  function showCreateQuestion(id) {
    localStorage.setItem("themeId", id);
    setCurrentComponent(currentComponent + 1);
  }

  return (
    <div className="container-select-theme">

      <ThemeTemplate baseUrl={baseUrl} onClickFunction={showCreateQuestion} setBaseUrl={setBaseUrl} />

    </div>
  );
};

export default SelectTheme;
