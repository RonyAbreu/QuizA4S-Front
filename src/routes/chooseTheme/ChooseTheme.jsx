import { useState } from "react";
import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";

import { useNavigate } from "react-router-dom";

const ChooseTheme = () => {
  const navigate = useNavigate();

  const [baseUrl, setBaseUrl] = useState("/theme")

  function startQuiz(id) {
    navigate(`/theme/quiz/${id}`);
  }

  return (
    <ThemeTemplate baseUrl={baseUrl} setBaseUrl={setBaseUrl} onClickFunction={startQuiz} />
  );
};

export default ChooseTheme;
