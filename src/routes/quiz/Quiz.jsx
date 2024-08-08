import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../../components/question/Question";
import InformationBox from "../../components/informationBox/InformationBox";
import Loading from "../../components/loading/Loading";
import QuestionFinished from "../../components/quizFinished/QuizFinished";
import { QuestionService } from "../../service/QuestionService";
import { ResponseService } from "../../service/ResponseService";

//Css
import "./Quiz.css";

const Quiz = () => {
  const questionService = new QuestionService();
  const responseService = new ResponseService();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [informationAlert, setInformationAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [quizFinished, setQuizFinished] = useState(false);

  const { id: themeId } = useParams();

  useEffect(() => {
    setLoading(true);

    const questionResponse = questionService.find10QuestionsByThemeId(themeId);

    questionResponse.then(response => {
      if(!response.success) {
        setTextAlert(response.message);
        setInformationAlert(true);
        return;
      }

      setQuestions(response.data);

      if(response.data.length < 5){
        setTextAlert("Cadastre no mínimo 5 questões para jogar esse quiz");
        setInformationAlert(true);
      }

      setLoading(false);
    })
  }, [themeId]);

  const [clickEnabled, setClickEnabled] = useState(true);

  function handleAnswerClick(event, alternativeId, questionId) {
    setClickEnabled(false);

    const isCorrect = isAlternativeCorrect(event);
    const alternatives = event.currentTarget.parentNode.childNodes;

    const green = "#5bcebf";
    const red = "#d9434f";
    const white = "#fff";

    alternatives.forEach((alt) => {
      alt.classList.remove("correct-answer", "wrong-answer");

      if (alt.getAttribute("value") === "true") {
        alt.style.backgroundColor = green;
        alt.style.color = white;
      } else {
        alt.style.backgroundColor = red;
        alt.style.color = white;
      }
    });

    if (isCorrect) {
      event.currentTarget.classList.add("correct-answer");
      setScore(score + 1);
    } else {
      event.currentTarget.classList.add("wrong-answer");
    }

    setTimeout(() => {
      setClickEnabled(true);

      if (currentQuestionIndex === questions.length - 1) {
        setQuizFinished(true);
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1500);

    if (token) {
      postResponse(user.uuid, questionId, alternativeId);
    }
  }

  function isAlternativeCorrect(event) {
    return event.currentTarget.getAttribute("value") === "true";
  }

  async function postResponse(uuid, questionId, alternativeId) {
    const response = await responseService.insertResponse(uuid, questionId, alternativeId);
    if(!response.success) {
      console.log("Usuário está jogando sem salvar suas respostas")
    }
  }

  function restart() {
    navigate("/theme");
  }

  const [time, setTime] = useState(0);

  function incrementTime() {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  }

  return (
    <div className="container-quiz-external">
      <div className="container-quiz">
        <div className="timer">
          <p>{time}s</p>
        </div>

        {questions.length > 0 && (
          <Question
            title={questions[currentQuestionIndex].title}
            questionId={questions[currentQuestionIndex].id}
            questionImg={questions[currentQuestionIndex].imageUrl}
            creatorId={questions[currentQuestionIndex].creatorId}
            alternatives={questions[currentQuestionIndex].alternatives}
            onAnswerClick={
              clickEnabled ? handleAnswerClick : () => console.log()
            }
            currentQuestion={currentQuestionIndex + 1}
            lastQuestion={questions.length}
          />
        )}
      </div>

      {loading && <Loading />}

      {informationAlert && (
        <InformationBox
          text={textAlert}
          closeBox={restart}
          icon="exclamation"
          color="red"
        />
      )}
      
      {!quizFinished && incrementTime()}

      {quizFinished && (
        <QuestionFinished
          percentage={((score / questions.length) * 100).toFixed(0)}
          restart={restart}
          score={score}
          time={time}
        />
      )}
    </div>
  );
};

export default Quiz;
