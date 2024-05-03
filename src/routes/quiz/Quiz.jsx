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

  const [resultMessage, setResultMessage] = useState("");

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

  const [resultInPercentagem, setResult] = useState(0);

  useEffect(() => {
    setResult((score / questions.length) * 100);
  }, [questions.length, score]);

  function isAlternativeCorrect(event) {
    return event.target.getAttribute("value") === "true";
  }

  function handleAnswerClick(event, alternativeId, questionId, creatorId) {
    const alternatives = document.querySelectorAll("li");

    alternatives.forEach((alt) => {
      if (alt.getAttribute("value") === "true") {
        alt.style.backgroundColor = "#5bcebf";
        alt.style.color = "#fff";
      } else {
        alt.style.backgroundColor = "#d9434f";
        alt.style.color = "#fff";
      }
    });

    setTimeout(() => {
      if (isAlternativeCorrect(event)) {
        setScore(score + 1);
      }

      if (currentQuestionIndex === questions.length - 1) {
        showResult();
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 100);

    if (token && user.uuid !== creatorId) {
      postResponse(user.uuid, questionId, alternativeId);
    }
  }

  function showResult() {
    if (resultInPercentagem >= 0 && resultInPercentagem <= 30) {
      setResultMessage(
        "Não desanime! Cada erro é uma oportunidade de aprender algo novo."
      );
      setInformationBox(true);
    } else if (resultInPercentagem > 30 && resultInPercentagem <= 60) {
      setResultMessage(
        "Você está indo bem! Com um pouco mais de prática, vai dominar este quiz!"
      );
      setInformationBox(true);
    } else if (resultInPercentagem > 60 && resultInPercentagem <= 90) {
      setResultMessage(
        "Impressionante! Você está quase lá, apenas mais um passo para a perfeição!"
      );
      setInformationBox(true);
    } else if (score == 10) {
      setResultMessage(
        "Uau! Pontuação máxima! Você é um verdadeiro mestre neste assunto!"
      );
      setInformationBox(true);
    }
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
            text={`${
              (score / questions.length) * 100
            }% de acertividade! ${resultMessage}`}
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
