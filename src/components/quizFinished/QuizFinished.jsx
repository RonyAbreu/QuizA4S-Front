import "./QuizFinished.css";

const QuizFinished = ({ score, questionLength, restart }) => {
  return (
    <div className="container-quiz-finished">
      <div className="quiz-finished">
        <h2 className="quiz-finished-title">Quiz Finalizado!</h2>
        {score >= 0 && score <= 3 && (
          <div className="quiz-finished-score">
            <span>{`${
              (score / questionLength) * 100
            }% de acertividade!`}</span>
            <p>
              Não desanime! Cada erro é uma oportunidade de aprender algo novo.
            </p>
          </div>
        )}
        {score > 3 && score <= 6 && (
          <div className="quiz-finished-score">
            <span>{`${
              (score / questionLength) * 100
            }% de acertividade!`}</span>
            <p>
              Você está indo bem! Com um pouco mais de prática, vai dominar este
              quiz!
            </p>
          </div>
        )}
        {score > 6 && score <= 9 && (
          <div className="quiz-finished-score">
            <span>{`${(score / questionLength) * 100}% de acertividade!`}</span>
            <p>
              Impressionante! Você está quase lá, apenas mais um passo para a
              perfeição!
            </p>
          </div>
        )}
        {score === 10 && (
          <div className="quiz-finished-score">
            <span>{`${(score / questionLength) * 100}% de acertividade!`}</span>
            <p>
              Uau! Pontuação máxima! Você é um verdadeiro mestre neste assunto!
            </p>
          </div>
        )}
        <button onClick={restart} className="quiz-finished-btn">
          Ok
        </button>
      </div>
    </div>
  );
};

export default QuizFinished;
