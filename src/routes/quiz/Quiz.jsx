import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "../../components/question/Question";
import InformationBox from "../../components/informationBox/InformationBox";
import Loading from "../../components/loading/Loading";
import { ApiFetch } from "../../util/ApiFetch";
import { URL_BASE } from "../../App";

//Css
import "./Quiz.css";

const Quiz = () => {
  const apiFetch = new ApiFetch();

  const path = useLocation().pathname;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [informationBox, setInformationBox] = useState(false);

  const [informationAlert, setInformationAlert] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    let themeId = path.substring("/theme/quiz/".length);

    async function getQuestionsByThemeId() {
      const url = `${URL_BASE}/question/quiz/${themeId}`;

      setLoading(true);
      const response = await fetch(url);

      if (response.status === 404) {
        setInformationAlert(true);
      }

      const questionsJson = await response.json();
      setLoading(false);

      setQuestions(questionsJson);
    }

    getQuestionsByThemeId();
  }, []);

  function handleAnswerClick(event, alternativeId, questionId, creatorId) {
    const alternatives = document.querySelectorAll("li");

    alternatives.forEach((alt) => {
      if (alt.getAttribute("value") === "true") {
        alt.style.backgroundColor = "#5bcebf";
        alt.style.color = "#fff"
      } else {
        alt.style.backgroundColor = "#d9434f";
        alt.style.color = "#fff"
      }
    });

    setTimeout(() => {
      if (isAlternativeCorrect(event)) {
        setScore(score + 1);
      }

      if (currentQuestionIndex === questions.length - 1) {
        setInformationBox(true);
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1500);

    if (token && user.uuid !== creatorId) {
      postResponse(user.uuid, questionId, alternativeId);
    }
  }

  function isAlternativeCorrect(event) {
    return event.target.getAttribute("value") === "true";
  }

  function postResponse(uuid, questionId, alternativeId) {
    const basePath = `/response/${uuid}/${questionId}/${alternativeId}`;

    const promisse = apiFetch.postResponse(basePath);

    promisse.then((response) => {
      if (!response.success) {
        console.log(response.message);
      }
    });
  }

  function restart() {
    navigate("/theme");
  }

  return (
    <div className="container-quiz-external">
      <div className="container-quiz">
        {loading && <Loading />}

        {informationBox && (
          <InformationBox
            text={`Você acertou ${score} de ${questions.length} questões!`}
            closeBox={restart}
            icon="check"
            color="green"
          />
        )}

        {informationAlert && (
          <InformationBox
            text="Nenhuma questão cadastrada!"
            closeBox={() => navigate("/theme")}
            icon="exclamation"
            color="red"
          />
        )}

        {questions.length > 0 && (
          <Question
            title={questions[currentQuestionIndex].title}
            questionId={questions[currentQuestionIndex].id}
            questionImg={questions[currentQuestionIndex].imageUrl}
            creatorId={questions[currentQuestionIndex].creatorId}
            alternatives={questions[currentQuestionIndex].alternatives}
            onAnswerClick={handleAnswerClick}
            currentQuestion={currentQuestionIndex + 1}
            lastQuestion={questions.length}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
