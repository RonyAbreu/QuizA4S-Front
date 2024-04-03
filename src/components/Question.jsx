import "../css/Question.css";

const Question = ({ title, alternatives, onAnswerClick }) => {
  return (
    <div className="question">
      <h1 className="question-title">{title}</h1>

      <ul className="alternatives">
        {alternatives &&
          alternatives.map((alternative) => (
            <li key={alternative.id} value={alternative.correct} onClick={onAnswerClick}>
              {alternative.text}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Question;
