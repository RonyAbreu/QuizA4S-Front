import ThemeTemplate from '../../components/themeTemplate/ThemeTemplate'

import { URL_BASE } from "../../App";
import { useNavigate } from 'react-router-dom';

const ChooseTheme = () => {
  const url = `${URL_BASE}/theme`
  const navigate = useNavigate()

  function startQuiz(id) {
    navigate(`/theme/quiz/${id}`);
  }

  return (
    <div>
      <ThemeTemplate url={url} onClickFunction={startQuiz} />
    </div>
  );
};

export default ChooseTheme;