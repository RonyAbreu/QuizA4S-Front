import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InformationBox from "../informationBox/InformationBox";
import { URL_BASE } from "../../App";
import Loading from "../loading/Loading";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import "./FormTemplate.css";

const FormTemplate = ({
  title,
  baseUrl,
  fields,
  buttonText,
  redirectText,
  redirectLink,
}) => {
  const [activeInformationBox, setInformationBox] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthenticationContext);

  const handleSubmit = (formData) => {
    if (isInvalidPassword(formData)) return;

    handleRequest(`${URL_BASE}${baseUrl}`, formData);
  };

  const handleRequest = async (url, formData) => {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);

    if (response.status === 500) {
      setError("Erro no servidor. Tente novamente mais tarde!");
      setInformationBox(true);
      return;
    } else if (response.status === 400) {
      setError("Tente novamente com outro email!");
      setInformationBox(true);
      return;
    } else if(response.status === 403){
      setError("Credenviais inválidas!");
      setInformationBox(true);
    }

    const responseJson = await response.json();
    if (responseJson.token) {
      window.localStorage.setItem("token", responseJson.token);
      setAuthenticated(true);
    }

    if (url.includes("register")) {
      let newUrl = url.replace("register", "login");

      setLoading(true);
      const responseLogin = await fetch(newUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);

      const responseJson = await responseLogin.json();
      window.localStorage.setItem("token", responseJson.token);
      setAuthenticated(true);
    }

    navigate("/");
  };

  const isInvalidPassword = (formData) => {
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setError("Senhas diferentes");
      setInformationBox(true);
      return true;
    }

    return false;
  };

  const closeInformationBox = () => {
    setInformationBox(false);
  };

  const requiredFieldMessage = "Campo obrigatório";
  const regexValidatedEmail =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function resolverSchema() {
    let schema;
    if (baseUrl === "/user/register") {
      schema = object().shape({
        email: string()
          .required(requiredFieldMessage)
          .matches(regexValidatedEmail, "Email Inválido")
          .max(100, "Máximo de 100 caracteres"),
        password: string()
          .required(requiredFieldMessage)
          .min(8, "Mínimo de 8 caracteres")
          .max(20, "Máximo de 20 caracteres"),
        name: string()
          .required(requiredFieldMessage)
          .min(3, "Mínimo de 3 caracteres")
          .max(30, "Máximo de 30 caracteres"),
        confirmPassword: string()
          .required(requiredFieldMessage)
          .min(8, "Mínimo de 8 caracteres")
          .max(20, "Máximo de 20 caracteres"),
      });

      return schema;
    } else {
      schema = object().shape({
        email: string()
          .required(requiredFieldMessage)
          .matches(regexValidatedEmail, "Email Inválido")
          .max(100, "Máximo de 100 caracteres"),
        password: string()
          .required(requiredFieldMessage)
          .min(8, "Mínimo de 8 caracteres")
          .max(20, "Máximo de 20 caracteres"),
      });

      return schema;
    }
  }

  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resolverSchema()) });

  return (
    <div className="container">
      <form onSubmit={onSubmit(handleSubmit)} className="form">
        <h1>{title}</h1>

        {fields.map((field) => (
          <label key={field.name} className="container-input">
            <span className="container-input-label">{field.label}:</span>
            <input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
            />
            <span className="span-error-message">
              {errors?.[field.name]?.message}
            </span>
          </label>
        ))}

        {loading && <Loading />}

        {activeInformationBox && (
          <InformationBox
            text={error}
            closeBox={closeInformationBox}
            icon="exclamation"
            color="red"
          />
        )}

        <button type="submit" className="btn">
          {buttonText}
        </button>
        <Link to={redirectLink} className="anchor">
          <p>{redirectText}</p>
        </Link>
      </form>
    </div>
  );
};

export default FormTemplate;