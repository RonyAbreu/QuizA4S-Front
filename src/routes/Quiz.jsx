import '../css/Quiz.css'
import { useLocation } from "react-router-dom";

const Quiz = () => {
  const path = useLocation().pathname;
  return (
    <div className="container-quiz outlet">
        <h1>Quiz do tema:{path}</h1>
    </div>
  )
};

export default Quiz;
