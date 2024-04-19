import { useState } from "react";
import CreateQuestions from "./CreateQuestions";
import SelectTheme from "./SelectTheme";

//Css
import "./CreateQuiz.css";

const CreateQuiz = () => {
  const [currentComponent, setCurrentComponent] = useState(0);

  const quizComponents = [<SelectTheme currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />, <CreateQuestions />];

  return (
    <div className="container-create-quiz outlet">
      <div className="container-create">
        {quizComponents[currentComponent]}
      </div>
    </div>
  );
};

export default CreateQuiz;
