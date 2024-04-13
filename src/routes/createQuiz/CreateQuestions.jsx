import React, { useState } from "react";
import "./CreateQuestions.css";

const CreateQuestions = () => {
  const [question, setQuestion] = useState({
    title: "",
    imageUrl: "",
  });

  const [alternatives, setAlternatives] = useState([
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
  ]);

  const changeQuestion = (value, data) => {
    setQuestion((prevQuestion) => ({ ...prevQuestion, [value]: data }));
  };

  const changeAlternative = (index, value, data) => {
    setAlternatives((prevAlternatives) => {
      const updatedAlternatives = [...prevAlternatives];
      updatedAlternatives[index] = {
        ...updatedAlternatives[index],
        [value]: data,
      };
      return updatedAlternatives;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode lidar com o envio do formulário
  };

  return (
    <div className="container-create-questions">
      <h2 className="create-questions-title">Crie as Questões do seu Quiz</h2>
      <form onSubmit={handleSubmit} className="create-questions-form">
        <div className="container-question">
          <label className="data-question">
            <span>Titulo:</span>
            <input
              type="text"
              name="title"
              placeholder="Insira o título da questão"
              value={question.title}
              onChange={(e) => changeQuestion("title", e.target.value)}
            />
          </label>

          <label className="data-question">
            <span>URL:</span>
            <input
              type="text"
              name="imageUrl"
              placeholder="Insira a url da imagem"
              value={question.imageUrl}
              onChange={(e) => changeQuestion("imageUrl", e.target.value)}
            />
          </label>
        </div>

        <div className="container-alternatives">
          {alternatives.map((alternative, index) => (
            <div key={index} className="alternative">
              <span>{`Alternativa ${index + 1}:`}</span>

              <label className="alternative-data">
                <input
                  type="text"
                  placeholder="Digite o texto da alternativa"
                  value={alternative.text}
                  onChange={(e) =>
                    changeAlternative(index, "text", e.target.value)
                  }
                  className="input-alternative-text"
                />
                <input
                  type="radio"
                  name="alternative"
                  id={`alt-${index + 1}`}
                  checked={alternative.correct}
                  onChange={(e) =>
                    changeAlternative(index, "correct", e.target.checked)
                  }
                  className="input-alternative-check"
                />
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-create-question">Criar</button>
      </form>
    </div>
  );
};

export default CreateQuestions;
