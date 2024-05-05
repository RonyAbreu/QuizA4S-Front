import { DEFAULT_IMG } from "../../App";

import "./Question.css";

const Question = ({
  title,
  questionId,
  questionImg,
  creatorId,
  alternatives,
  onAnswerClick,
  currentQuestion,
  lastQuestion,
}) => {

  const alternativeList = ["A", "B", "C", "D"];

  return (
    <div className="question">
      <div className="question-header">
        <p className="question-number">
          Questão {currentQuestion} de {lastQuestion}
        </p>
        <h1 className="question-title">{title}</h1>
        <img
          src={
            questionImg == null || questionImg == "" ? DEFAULT_IMG : questionImg
          }
          alt="image"
          className="question-image"
          loading="lazy"
        />
      </div>

      <ul className="alternatives">
        {alternatives &&
          alternatives.map((alternative, index) => (
            <li
              key={alternative.id}
              value={alternative.correct}
              onClick={(e) =>
                onAnswerClick(e, alternative.id, questionId, creatorId)
              }
            >
              <span>{alternativeList[index]}</span>
              <p>{alternative.text}</p>
              
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Question;
