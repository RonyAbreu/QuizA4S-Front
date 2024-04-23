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

  const navigate = useNavigate();

  const { uuid } = JSON.parse(localStorage.getItem("user"));
  const [questionId, setQuestionId] = useState(0);
  const token = localStorage.getItem("token");

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

  function handleAnswerClick(event, alternativeId) {
    const alternatives = document.querySelectorAll("li");

    alternatives.forEach((alt) => {
      if (alt.getAttribute("value") === "true") alt.style.backgroundColor = "green";
      else alt.style.backgroundColor = "red";
    });

    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        setInformationBox(true);
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionId(questions[currentQuestionIndex].id)

      if (isAlternativeCorrect(event)) {
        setScore(score + 1);
      }
    }, 500);

    if(token){
      postResponse(uuid, questionId, alternativeId);
    }
    
  }

  function isAlternativeCorrect(event) {
    return event.target.getAttribute("value") === "true";
  }

  function postResponse(uuid, questionId, alternativeId){
    const basePath = `/response/${uuid}/${questionId}/${alternativeId}`;

    const promisse = apiFetch.postResponse(basePath);

    promisse.then((response) =>{
      if(!response.success){
        console.log(response.message)
      }

      console.log(response.message)
    })

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
