import "./Question.css";

const Question = ({
  title,
  questionId,
  creatorId,
  alternatives,
  onAnswerClick,
  currentQuestion,
  lastQuestion,
}) => {
  return (
    <div className="question">
      <div className="question-header">
        <p className="question-number">
          Questão {currentQuestion} de {lastQuestion}
        </p>
        <h1 className="question-title">{title}</h1>
      </div>

      <ul className="alternatives">
        {alternatives &&
          alternatives.map((alternative) => (
            <li
              key={alternative.id}
              value={alternative.correct}
              onClick={(e) => onAnswerClick(e, alternative.id, questionId, creatorId)}
            >
              {alternative.text}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Question;
