import { useState } from "react";
import ConfirmBox from "../confirmBox/ConfirmBox";
import UpdateBox from "../updateBox/UpdateBox";
import { ApiFetch } from "../../util/ApiFetch";
import Loading from "../loading/Loading";
import InformationBox from "../informationBox/InformationBox";
import { DEFAULT_IMG } from "../../App";

import "./Theme.css";
import { useNavigate } from "react-router-dom";

const Theme = ({ themes, setThemes, setCurrentPage, setCallBack }) => {
  const apiFetch = new ApiFetch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [isConfirmBox, setConfirmBox] = useState(false);
  const [isUpdateBox, setUpdateBox] = useState(false);
  const [isInformationBox, setInformationBox] = useState(false);

  const [informationData, setInformationData] = useState({
    text: "",
    icon: "",
    color: "",
  });

  const [themeId, setThemeId] = useState(0);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const inputs = [
    {
      label: "Novo nome",
      type: "text",
      placeholder: "Digite o nome do tema",
      value: newName,
      maxLength: 20,
      minLength: 3,
    },
    {
      label: "URL da Imagem",
      type: "text",
      placeholder: "Digite a url da imagem",
      value: newUrl,
      maxLength: 255,
      minLength: 0,
    },
  ];

  function showConfirmBox(id, name, imageUrl) {
    setThemeId(id);
    setNewName(name);
    setNewUrl(imageUrl);
    setConfirmBox(true);
  }

  function showUpdateBox(id, name, imageUrl) {
    setThemeId(id);
    setNewName(name);
    setNewUrl(imageUrl);
    setUpdateBox(true);
  }

  function removeTheme() {
    setLoading(true);

    const promisse = apiFetch.delete(`/theme/${themeId}`, false);

    promisse.then((response) => {
      if (!response.removed) {
        activeInformationBox(true, response.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setThemes(themes.filter((theme) => themeId !== theme.id))
      setCurrentPage(0);
      activeInformationBox(false, "Tema removido com sucesso!");
      setConfirmBox(false);
    });
  }

  const newTheme = {
    name: newName,
    imageUrl: newUrl,
  };

  function updateTheme() {
    setLoading(true);
    const promisse = apiFetch.patch(`/theme/${themeId}`, newTheme);

    promisse.then((response) => {
      if (!response.success) {
        activeInformationBox(true, response.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      activeInformationBox(false, "Tema atualizado com sucesso");
      setCallBack({});
      setUpdateBox(false);
    });
  }

  function activeInformationBox(isFail, message) {
    if (isFail) {
      setInformationData((prevData) => {
        return { ...prevData, text: message, color: "red", icon: "exclamation"  };
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
      case "Novo nome":
        setNewName(value);
        return;
      case "URL da Imagem":
        setNewUrl(value);
        return;
      default:
        return "";
    }
  }

  function showQuestions(id, name, imageUrl){
    const theme = {
      id,
      name,
      imageUrl,
    }
    localStorage.setItem("theme", JSON.stringify(theme));
    navigate(`/profile/theme/${id}/question`)
  }

  return (
    <div className="my-theme-list">
      {themes &&
        themes.map((theme) => (
          <div key={theme.id} className="theme-data">
            <img
              src={theme.imageUrl == null || theme.imageUrl == "" ? DEFAULT_IMG : theme.imageUrl}
              alt="image"
              loading="lazy"
            />
            <div className="theme-questions">
              <p>{theme.name}</p>
              <button type="button" onClick={() => showQuestions(theme.id, theme.name, theme.imageUrl)}>Questões</button>
            </div>
            <div className="theme-action">
              <i
                className="bi bi-trash-fill"
                onClick={() =>
                  showConfirmBox(theme.id, theme.name, theme.imageUrl)
                }
              ></i>
              <i
                className="bi bi-pencil-square"
                onClick={() =>
                  showUpdateBox(theme.id, theme.name, theme.imageUrl)
                }
              ></i>
            </div>
          </div>
        ))}

      {isConfirmBox && (
        <ConfirmBox
          title="Deseja remover este tema?"
          textBtn1="Sim"
          textBtn2="Não"
          onClickBtn1={removeTheme}
          onClickBtn2={() => setConfirmBox(false)}
        />
      )}
      {isUpdateBox && (
        <UpdateBox
          title="Atualizar Tema"
          inputs={inputs}
          onChange={changeValue}
          onClickSave={updateTheme}
          onClickCancel={() => setUpdateBox(false)}
        />
      )}
      {isInformationBox && (
        <InformationBox
          text={informationData.text}
          color={informationData.color}
          icon={informationData.icon}
          closeBox={() => setInformationBox(false)}
        />
      )}

      {loading && <Loading />}
    </div>
  );
};

export default Theme;
