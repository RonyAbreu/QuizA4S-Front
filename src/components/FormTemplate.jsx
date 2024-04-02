import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InformationBox from "../components/InformationBox";
import { URL_BASE } from "../App";

import "../css/FormTemplate.css";

const FormTemplate = ({
  title,
  onSubmit,
  buttonText,
  redirectText,
  redirectLink,
}) => {
  const [formData, setFormData] = useState({});
  const [activeInformationBox, setInformationBox] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInvalidPassword()) return;

    handleRequest(URL_BASE + onSubmit.url)
  };

  const handleRequest = async (url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (![200, 201].includes(response.status)) {
      setError("Credenciais inválidas");
      setInformationBox(true);
      return;
    }

    if (url.includes("register")) {
      let newUrl = url.replace("register", "login");

      const responseLogin = await fetch(newUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseJson = await responseLogin.json();
      window.localStorage.setItem("token", responseJson.token);
    }

    navigate("/user");
  };

  const isInvalidPassword = () => {
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

  return (
    <div className="container outlet">
      <form onSubmit={handleSubmit} className="form">
        <h1>{title}</h1>

        {onSubmit.fields.map((field) => (
          <label key={field.name} className="container-input">
            <span>{field.label}:</span>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          </label>
        ))}

        {activeInformationBox && (
          <InformationBox
            text={error}
            closeBox={closeInformationBox}
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
