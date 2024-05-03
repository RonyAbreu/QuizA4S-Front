import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "../../components/question/Question";
import InformationBox from "../../components/informationBox/InformationBox";
import Loading from "../../components/loading/Loading";
import { ApiFetch } from "../../util/ApiFetch";
import { URL_BASE } from "../../App";
import QuestionFinished from "../../components/quizFinished/QuizFinished";

//Css
import "./Quiz.css";

const Quiz = () => {
  const apiFetch = new ApiFetch();

  const path = useLocation().pathname;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [informationAlert, setInformationAlert] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [quizFinished, setQuizFinished] = useState(false);

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

  function isAlternativeCorrect(event) {
    return event.target.getAttribute("value") === "true";
  }

  function handleAnswerClick(event, alternativeId, questionId, creatorId) {
    const isCorrect = isAlternativeCorrect(event);
    const alternatives = event.currentTarget.parentNode.childNodes;

    alternatives.forEach((alt) => {
      alt.classList.remove('correct-answer', 'wrong-answer');

      if (alt.getAttribute("value") === "true") {
        alt.style.backgroundColor = "#5bcebf";
        alt.style.color = "#fff";
      } else {
        alt.style.backgroundColor = "#d9434f";
        alt.style.color = "#fff";
      }
    });

    if (isCorrect) {
      event.currentTarget.classList.add('correct-answer');
      setScore(score + 1);
    } else {
      event.currentTarget.classList.add('wrong-answer');
    }

    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        setQuizFinished(true);
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1500);

    if (token && user.uuid !== creatorId) {
      postResponse(user.uuid, questionId, alternativeId);
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

        {informationAlert && (
          <InformationBox
            text="Nenhuma questão cadastrada!"
            closeBox={() => navigate("/theme")}
            icon="exclamation"
            color="red"
          />
        )}

        {quizFinished && (
          <QuestionFinished
            score={score}
            questionLength={questions.length}
            restart={restart}
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
