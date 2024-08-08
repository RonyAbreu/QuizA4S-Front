import { useState } from "react";
import Loading from "../loading/Loading";
import Ranking from "../ranking/Ranking";
import ConfirmBox from "../confirmBox/ConfirmBox";
import "./QuizFinished.css";
import { ScoreService } from './../../service/ScoreService';

const QuizFinished = ({ percentage, restart, score, time }) => {

  const scoreService = new ScoreService();

  const [loading, setLoading] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const isAuth = localStorage.getItem("token");

  const [activeRanking, setActiveRanking] = useState(false);

  function calculateResult() {
    const hitValue = 97.45;
    const reduceValue = 1.26;
    const result = (score * hitValue) - (time * reduceValue);
    if(result < 0) return 0.0;
    return result.toFixed(2);
  }

  const scoreRequest = {
    numberOfHits: score,
    totalTime: time,
  };

  function saveResult() {
    const { uuid: userId } = JSON.parse(localStorage.getItem("user"));
    const { id: themeId } = JSON.parse(localStorage.getItem("theme"));

    setConfirmBox(false);

    setLoading(true);
    scoreService.insertScore(scoreRequest, userId, themeId);
    setLoading(false);
    setActiveRanking(true);
  }

  return (
    <div className="container-quiz-finished">
      <div className="quiz-finished">
        <h2 className="quiz-finished-title">Quiz Finalizado!</h2>

        {isAuth && (
          <p className="quiz-finished-point">
            Sua pontuação: {calculateResult()}
          </p>
        )}

        {percentage >= 0 && percentage <= 30 && (
          <div className="quiz-finished-score">
            <span>{`${percentage}% de acertividade!`}</span>
            <p>
              Não desanime! Cada erro é uma oportunidade de aprender algo novo.
            </p>
          </div>
        )}
        {percentage > 30 && percentage <= 60 && (
          <div className="quiz-finished-score">
            <span>{`${percentage}% de acertividade!`}</span>
            <p>
              Você está indo bem! Com um pouco mais de prática, vai dominar este
              quiz!
            </p>
          </div>
        )}
        {percentage > 60 && percentage <= 90 && (
          <div className="quiz-finished-score">
            <span>{`${percentage}% de acertividade!`}</span>
            <p>
              Impressionante! Você está quase lá, apenas mais um passo para a
              perfeição!
            </p>
          </div>
        )}
        {percentage == 100 && (
          <div className="quiz-finished-score">
            <span>{`${percentage}% de acertividade!`}</span>
            <p>
              Uau! Pontuação máxima! Você é um verdadeiro mestre neste assunto!
            </p>
          </div>
        )}
        <div className="container-quiz-finished-btn">
          <button onClick={restart} className="quiz-finished-btn">
            Voltar
          </button>
          {isAuth && (
            <button
              onClick={() => setConfirmBox(true)}
              className="quiz-finished-btn"
            >
              Ranking
            </button>
          )}
        </div>
      </div>

      {activeRanking && <Ranking />}

      {loading && <Loading />}

      {confirmBox && (
        <ConfirmBox
          title="Deseja salvar sua pontuação?"
          textBtn1="Sim"
          textBtn2="Não"
          onClickBtn1={saveResult}
          onClickBtn2={() => {
            setConfirmBox(false);
            setActiveRanking(true);
          }}
        />
      )}
    </div>
  );
};

export default QuizFinished;
