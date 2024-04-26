import { useState } from "react";
import "./ThemeMenu.css";
import { URL_BASE } from "../../App";
import Loading from "../loading/Loading";
import InformationBox from "../informationBox/InformationBox";

const url = `${URL_BASE}/theme`;

const ThemeMenu = ({ setThemeMenu }) => {
  const [themeName, setThemeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadin, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);

  const [informationData, setData] = useState({
    text: "Dados inválidos",
    color: "red",
    icon: "exclamation",
  });

  const theme = {
    name: themeName,
    imageUrl: imageUrl,
  };

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    postTheme(token);
  }

  async function postTheme(token) {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(theme),
    });
    setLoading(false);

    if (!response.ok) {
      setInformationBox(true);
      return;
    }

    setThemeName("");
    setImageUrl("");

    setData((prevData) => {
      return {
        ...prevData,
        color: "green",
        text: "Tema criado com sucesso",
        icon: "check",
      };
    });
    setInformationBox(true);
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
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            required
          />
        </label>

        <label className="theme-menu-input">
          <span>Imagem:</span>
          <input
            type="text"
            name="imageUrl"
            placeholder="Digite a URL da imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
