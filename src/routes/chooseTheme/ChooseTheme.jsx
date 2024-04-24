import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";

import { useNavigate } from "react-router-dom";

const ChooseTheme = () => {
  const navigate = useNavigate();

  function startQuiz(id) {
    navigate(`/theme/quiz/${id}`);
  }

  return (
    <ThemeTemplate url="/theme" onClickFunction={startQuiz} />
  );
};

export default ChooseTheme;
