import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_BASE } from "../../App";
import Question from "../../components/question/Question";

//Css
import "./Quiz.css";
import InformationBox from "../../components/informationBox/InformationBox";
import Loading from "../../components/loading/Loading";

const Quiz = () => {
  const path = useLocation().pathname;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [informationBox, setInformationBox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let themeId;

    if(path.includes("myquiz")){
      themeId = path.substring("/myquiz/quiz/".length)
    } else {
      themeId = path.substring("/theme/quiz/".length)
    }
    
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
    const alternatives = document.querySelectorAll("li");

    alternatives.forEach((alt) => {
      if (alt.getAttribute("value") === "true")
        alt.style.backgroundColor = "green";
      else alt.style.backgroundColor = "red";
    });

    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        setInformationBox(true);
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);

      if (isAlternativeCorrect(alternative)) {
        setScore(score + 1);
      }
    }, 500);
  }

  function isAlternativeCorrect(alternative) {
    return alternative.target.getAttribute("value") === "true";
  }

  function restart(){
    if(path.includes("myquiz")){
      navigate("/myquiz")
    } else {
      navigate("/theme")
    }
  }

  return (
    <div className="container-quiz">
      {loading && <Loading />}

      {informationBox && (
        <InformationBox
          text={`Você acertou ${score + 1} de ${questions.length} questões!`}
          closeBox={restart}
          icon="check"
          color="green"
        />
      )}

      {questions.length > 0 && (
        <Question
          title={questions[currentQuestionIndex].title}
          alternatives={questions[currentQuestionIndex].alternatives}
          onAnswerClick={handleAnswerClick}
          currentQuestion={currentQuestionIndex + 1}
          lastQuestion={questions.length}
        />
      )}
    </div>
  );
};

export default Quiz;
