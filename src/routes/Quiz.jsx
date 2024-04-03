import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_BASE } from "../App";
import Question from "../components/Question";

//Css
import "../css/Quiz.css";

const Quiz = () => {
  const path = useLocation().pathname;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const navigate = useNavigate()

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

  function handleAnswerClick(alternative) {
    if (currentQuestionIndex === questions.length - 1) {
      alert("quiz acabou");
      alert(`Você acertou ${score + 1} de 10 questões!`);
      navigate("/theme")
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);

    if (isAlternativeCorrect(alternative)) {
      setScore(score + 1);
    }
  }

  function isAlternativeCorrect(alternative){
    return alternative.target.getAttribute("value") === "true";
  }

  return (
    <div className="container-quiz">
      {loading && <h1>Carregando...</h1>}

      {questions.length > 0 && (
        <Question
          title={questions[currentQuestionIndex].title}
          alternatives={questions[currentQuestionIndex].alternatives}
          onAnswerClick={handleAnswerClick}
        />
      )}
    </div>
  );
};

export default Quiz;
