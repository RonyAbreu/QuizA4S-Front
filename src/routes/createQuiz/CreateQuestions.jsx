import { useState } from "react";
import { URL_BASE } from "../../App";
import Loading from "../../components/loading/Loading";
import InformationBox from "../../components/informationBox/InformationBox";

import "./CreateQuestions.css";

const urlQuestion = `${URL_BASE}/question`;
const urlAlternative = `${URL_BASE}/alternative/all`;

const CreateQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);

  const [informationBoxData, setInformationBoxData] = useState({
    text: "Dados inválidos",
    color: "red",
    icon: "exclamation",
  });

  const idTheme = JSON.parse(localStorage.getItem("theme")).id;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    postQuestion(token);
  };

  async function postQuestion(token) {
    setLoading(true);
    const questionResponse = await fetch(`${urlQuestion}/${idTheme}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(question),
    });
    setLoading(false);

    if (!questionResponse.ok) {
      setInformationBox(true);
      setLoading(false);
      return;
    }

    const questionJson = await questionResponse.json();

    postAllAltervatives(questionJson.id, token);
  }

  async function postAllAltervatives(idQuestion, token) {
    setLoading(true)
    const alternativeResponse = await fetch(`${urlAlternative}/${idQuestion}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(alternatives),
    });
    setLoading(false)

    if (!alternativeResponse.ok) {
      setInformationBox(true)
      removeQuestion(idQuestion, token);
      setLoading(false)
      return;
    }

    setInformationBoxData((prevData) =>{
      return {
        ...prevData,
        color: "green",
        text: "Questão criada com sucesso",
        icon: "check",
      }
    })
    setInformationBox(true)
    clearForm();
  }

  async function removeQuestion(idQuestion, token) {
    setLoading(true)
    const questionResponse = await fetch(`${urlQuestion}/${idQuestion}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false)

    if (!questionResponse.ok) {
      alert("Erro do servidor")
      setLoading(false)
    }
  }

  function clearForm() {
    setQuestion((prevQuestion) => {
      return { ...prevQuestion, title: "", imageUrl: "" };
    });

    for (let i = 0; i < alternatives.length; i++) {
      alternatives[i] = { text: "", correct: false };
    }
  }

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

  return (
    <div className="container-create-questions">
      <h2 className="create-questions-title">Crie as Questões do seu Quiz</h2>
      <form onSubmit={handleSubmit} className="create-questions-form" id="form">
        <div className="container-question">
          <label className="data-question">
            <span>Titulo:</span>
            <input
              type="text"
              name="title"
              placeholder="Insira o título da questão"
              value={question.title}
              onChange={(e) => changeQuestion("title", e.target.value)}
              required
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
                  required
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
                  required
                />
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-create-question">
          Criar
        </button>
      </form>

      {loading && <Loading />}
      {informationBox && (
        <InformationBox
          closeBox={() => setInformationBox(false)}
          color={informationBoxData.color}
          text={informationBoxData.text}
          icon={informationBoxData.icon}
        />
      )}
    </div>
  );
};

export default CreateQuestions;
