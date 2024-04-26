import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate";

import { useNavigate } from "react-router-dom";

const ChooseMyTheme = () => {
  const navigate = useNavigate();

  function startQuiz(id) {
    navigate(`/theme/quiz/${id}`);
  }

  return (
    <ThemeTemplate url="/theme/creator" onClickFunction={startQuiz} />
  );
};

export default ChooseMyTheme;
