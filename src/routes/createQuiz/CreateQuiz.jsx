import SelectTheme from "./SelectTheme";

//Css
import "./CreateQuiz.css";
import CreateTheme from "./CreateTheme";

const CreateQuiz = () => {

  const quizComponents = [<CreateTheme />, <SelectTheme />];

  return (
    <div className="container-create-quiz">
      <div className="container-create">
        <div>
          <button type="button">Criar Tema</button>
        </div>
        <div>
          <button type="button">Escolhar Tema</button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
