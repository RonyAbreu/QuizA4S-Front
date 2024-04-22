import { useState } from "react";
import UpdateBox from "../../components/updateBox/UpdateBox";
import Loading from "../../components/loading/Loading";
import { ApiFetch } from "../../util/ApiFetch";
import InformationBox from "../../components/informationBox/InformationBox";

import "./MyAlternative.css";

const MyAlternative = ({ alternatives, setShowAlternatives, setCallBack }) => {
  const apiFetch = new ApiFetch();
  const alternativeList = ["A", "B", "C", "D"];

  const [newResponse, setResponse] = useState("");

  const [alternativeId, setAlternativeId] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isUpdateBox, setUpdateBox] = useState(false);
  const [isInformationBox, setInformationBox] = useState(false);

  const inputs = [
    {
      label: "Nova resposta",
      type: "text",
      placeholder: "Digite sua resposta",
      value: newResponse,
    },
  ];

  const [informationData, setInformationData] = useState({
    text: "",
    icon: "exclamation",
    color: "red",
  });

  function activeInformationBox(isFail, message) {
    if (isFail) {
      setInformationData((prevData) => {
        return { ...prevData, text: message };
      });
      setInformationBox(true);
    } else {
      setInformationData((prevData) => {
        return { ...prevData, text: message, color: "green", icon: "check" };
      });
      setInformationBox(true);
    }
  }

  function changeValue(value, label) {
    switch (label) {
      case "Nova resposta":
        setResponse(value);
        return;
      default:
        return "";
    }
  }

  function showUpdateBox(text, id) {
    setResponse(text);
    setAlternativeId(id);
    setUpdateBox(true);
  }

  function updateQuestion() {
    setLoading(true);
    const promisse = apiFetch.patch(`/alternative/${alternativeId}`, {
      text: newResponse,
    });

    promisse.then((response) => {
      if (!response.success) {
        activeInformationBox(true, response.message);
        setLoading(false);
        return;
      }

      setCallBack({});
      activeInformationBox(false, "Alternativa atualizada com sucesso!");
      setLoading(false);
      setUpdateBox(false);
      setTimeout(() =>{
        setShowAlternatives(false);
      }, 1000)
    });
  }

  return (
    <div className="container-my-alternatives">
      <div className="my-alternatives">
        <span onClick={() => setShowAlternatives(false)}>X</span>
        <h2>Alternativas</h2>
        <div className="alternatives-body">
          {alternatives &&
            alternatives.map((alt, index) => (
              <div
                key={alt.id}
                className="alternatives-data"
                style={{
                  backgroundColor: alt.correct ? "green" : "",
                  color: alt.correct ? "white" : "black",
                }}
              >
                <p className="alternative-letter">{alternativeList[index]}</p>
                <p className="alternative-text">{alt.text}</p>
                <i
                  className="bi bi-pencil-square"
                  onClick={() => showUpdateBox(alt.text, alt.id)}
                ></i>
              </div>
            ))}
        </div>
      </div>

      {isUpdateBox && (
        <UpdateBox
          title="Atualizar Alternativa"
          inputs={inputs}
          onChange={changeValue}
          onClickSave={updateQuestion}
          onClickCancel={() => setUpdateBox(false)}
        />
      )}

      {loading && <Loading />}

      {isInformationBox && (
        <InformationBox
          text={informationData.text}
          color={informationData.color}
          icon={informationData.icon}
          closeBox={() => setInformationBox(false)}
        />
      )}
    </div>
  );
};

export default MyAlternative;
