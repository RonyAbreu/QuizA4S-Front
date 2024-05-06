import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";

import { useNavigate } from "react-router-dom";

const ChooseTheme = () => {
  const navigate = useNavigate();

  const baseUrl = "/theme";

  function startQuiz(theme) {
    localStorage.setItem("theme", JSON.stringify(theme));
    navigate(`/theme/quiz/${theme.id}`);
  }

  return (
    <ThemeTemplate baseUrl={baseUrl} onClickFunction={startQuiz} />
  );
};

export default ChooseTheme;
