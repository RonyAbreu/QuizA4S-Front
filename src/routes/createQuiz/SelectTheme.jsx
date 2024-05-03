import { useNavigate } from "react-router-dom";
import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";

import "./SelectTheme.css";

const SelectTheme = () => {
  const baseUrl = "/theme/creator";
  const navigate = useNavigate();

  function showCreateQuestion(theme) {
    localStorage.setItem("theme", JSON.stringify(theme));
    navigate(`/create/quiz/${theme.id}/question`)
  }

  return (
    <div className="container-select-theme">

      <ThemeTemplate baseUrl={baseUrl} onClickFunction={showCreateQuestion} />

    </div>
  );
};

export default SelectTheme;
