import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { URL_BASE } from "../App";
import Question from "../components/Question";

//Css
import "../css/Quiz.css";

const Quiz = () => {
  const path = useLocation().pathname;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  let themeId;

  if (path.includes("user")) {
    themeId = path.substring("/user/theme/quiz/".length);
  } else {
    themeId = path.substring("/theme/quiz/".length);
  }

  useEffect(() => {
    async function getQuestionsByThemeId() {
      const url = `${URL_BASE}/question/quiz/${themeId}`;

      setLoading(true);
      const response = await fetch(url);
      const questionsJson = await response.json();
      setLoading(false);

      setQuestions(questionsJson);
    }

    getQuestionsByThemeId();
  }, []);


  return (
    <div className="container-quiz outlet">
      {loading && <h1>Carregando...</h1>}
    </div>
  );
};

export default Quiz;
