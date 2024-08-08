import { useRef, useState } from "react";
import { URL_BASE } from "../../App";
import Loading from "../loading/Loading";
import InformationBox from "../informationBox/InformationBox";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./ThemeMenu.css";
import SearchImage from "../searchImageComponent/SearchImage";

const url = `${URL_BASE}/theme`;

const ThemeMenu = ({ setThemeMenu }) => {
  const [loadin, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);
  const [searchImage, setSearchImage] = useState(false);

  const navigate = useNavigate();

  const [informationData, setData] = useState({
    text: "",
    color: "",
    icon: "",
  });

  const inputImageUrl = document.getElementById("input-image-url");

  function getUrlOfImage(imageUrl) {
    inputImageUrl.value = imageUrl;
    setSearchImage(false);
  }

  function handleSubmit(themeRequest) {
    const token = localStorage.getItem("token");

    if (!token) return;

    themeRequest.imageUrl = inputImageUrl.value
    postTheme(token, themeRequest);
  }

  async function postTheme(token, themeRequest) {
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
          return res.json().then((data) => navigateCreateQuestion(data));
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

  function navigateCreateQuestion(theme) {
    localStorage.setItem("theme", JSON.stringify(theme));
    navigate(`/create/quiz/${theme.id}/question`);
  }

  const schema = object().shape({
    name: string()
      .required("Campo obrigatório")
      .min(3, "Mínimo de 3 caracteres")
      .max(20, "Máximo de 20 caracteres"),
    imageUrl: string().url("URL inválida"),
  });

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(schema)});

  return (
    <div className="theme-menu">
      <form className="form-menu">
        <div className="theme-menu-close">
          <i
            className="bi bi-x-circle-fill"
            onClick={() => setThemeMenu(false)}
          ></i>
        </div>

        <h2 className="theme-menu-title">Criar tema</h2>

        <label className="theme-menu-input">
          <p>Nome:</p>
          <input
            type="text"
            placeholder="Digite o nome do seu tema"
            {...register("name")}
          />
          <span className="span-error-message">{errors?.name?.message}</span>
        </label>

        <label className="theme-menu-input">
          <p>Imagem:</p>
          <input
            id="input-image-url"
            type="text"
            placeholder="Digite ou Pesquise a URL da imagem"
            {...register("imageUrl")}
          />
          <span className="span-error-message">{errors?.imageUrl?.message}</span>
        </label>

        <button type="button" className="theme-menu-btn" onClick={() => setSearchImage(true)}>
          Pesquisar Imagem na Web
        </button>

        <button type="button" className="theme-menu-btn" onClick={onSubmit(handleSubmit)}>
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
        {searchImage && <SearchImage setSearchImage={setSearchImage} getUrlOfImage={getUrlOfImage}/>}
      </form>
    </div>
  );
};

export default ThemeMenu;
