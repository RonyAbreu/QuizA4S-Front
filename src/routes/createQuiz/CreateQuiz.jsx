import { useState } from "react";
import CreateQuestions from "./CreateQuestions";
import SelectTheme from "./SelectTheme";

//Css
import "./CreateQuiz.css";

const CreateQuiz = () => {
  const [currentComponent, setCurrentComponent] = useState(0);

  const quizComponents = [<SelectTheme />, <CreateQuestions />];

  return (
    <div className="container-create-quiz outlet">
      <h1 className="create-quiz-title">Crie seu Quiz</h1>

      <div className="container-create">{quizComponents[currentComponent]}</div>
    </div>
  );
};

export default CreateQuiz;
