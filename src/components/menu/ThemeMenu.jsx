import { useState } from "react";
import { URL_BASE } from "../../App";
import Loading from "../loading/Loading";
import InformationBox from "../informationBox/InformationBox";
import { useNavigate } from "react-router-dom";

import "./ThemeMenu.css";

const url = `${URL_BASE}/theme`;

const ThemeMenu = ({ setThemeMenu }) => {
  const [loadin, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);

  const navigate = useNavigate();

  const [informationData, setData] = useState({
    text: "",
    color: "",
    icon: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    postTheme(token);
  }

  const [themeRequest, setThemeRequest] = useState({
    name: "",
    imageUrl: "",
  })

  async function postTheme(token) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(themeRequest),
    })
      .then((res) => {
        if (res.status === 201) {
          activeInformationBox(false, "Tema criado com sucesso");
          setThemeRequest({themeName: "", imageUrl: ""})
          return res.json().then((data) => navigateCreateQuestion(data))
        } else if (res.status === 400) {
          return res.json().then((data) => {
            activeInformationBox(true, data.message);
          });
        }
      })
      .catch((erro) => console.error(erro));

    setTimeout(() => {
      setLoading(false);
    }, 150);
  }

  function activeInformationBox(isFail, message) {
    if (isFail) {
      setData((prevData) => {
        return {
          ...prevData,
          text: message,
          color: "red",
          icon: "exclamation",
        };
      });
      setInformationBox(true);
    } else {
      setData((prevData) => {
        return { ...prevData, text: message, color: "green", icon: "check" };
      });
      setInformationBox(true);
    }
  }

  function navigateCreateQuestion(theme){
    localStorage.setItem("theme", JSON.stringify(theme));
    navigate(`/create/quiz/${theme.id}/question`)
  }

  function changeTheme(name, value){
    setThemeRequest((prevTheme) =>{
      return {...prevTheme, [name]: value}
    })
  }

  return (
    <div className="theme-menu">
      <form onSubmit={handleSubmit} className="form-menu">
        <div className="theme-menu-close">
          <i
            className="bi bi-x-circle-fill"
            onClick={() => setThemeMenu(false)}
          ></i>
        </div>

        <h2 className="theme-menu-title">Criar tema</h2>

        <label className="theme-menu-input">
          <span>Nome:</span>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome do seu tema"
            value={themeRequest.name}
            onChange={(e) => changeTheme("name",e.target.value)}
            required
          />
        </label>

        <label className="theme-menu-input">
          <span>Imagem:</span>
          <input
            type="text"
            name="imageUrl"
            placeholder="Digite a URL da imagem"
            value={themeRequest.imageUrl}
            onChange={(e) => changeTheme("imageUrl", e.target.value)}
          />
        </label>

        <button type="submit" className="theme-menu-btn">
          Criar
        </button>

        {informationBox && (
          <InformationBox
            text={informationData.text}
            color={informationData.color}
            icon={informationData.icon}
            closeBox={() => setInformationBox(false)}
          />
        )}
        {loadin && <Loading />}
      </form>
    </div>
  );
};

export default ThemeMenu;
