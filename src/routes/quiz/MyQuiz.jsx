import { URL_BASE } from "../../App";
import ThemeTemplate from "../../components/themeTemplate/ThemeTemplate"
import { useNavigate } from "react-router-dom";

const url = `/theme/creator`

const MyQuiz = () => {

  const navigate = useNavigate()

  function startQuiz(id) {
    navigate(`/myquiz/quiz/${id}`);
  }

  return (
    <div className="container-my-quiz outlet">
      <ThemeTemplate url={url} onClickFunction={startQuiz}/>
    </div>
  )
}

export default MyQuiz