const Question = ({ title, alternatives }) => {
  return (
    <div className="question">
      <div className="question-title">
        <h1>{title}</h1>
      </div>

      <ul className="alternatives">
        {alternatives &&
          alternatives.map((alternative) => (
            <li key={alternative.id} value={alternative.correct}>
              {alternative.text}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Question;
