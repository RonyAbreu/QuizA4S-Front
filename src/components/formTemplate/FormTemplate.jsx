import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InformationBox from "../informationBox/InformationBox";
import { URL_BASE } from "../../App";
import Loading from "../loading/Loading";
import { AuthenticationContext } from "../../context/AutenticationContext";

import "./FormTemplate.css";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setAuthenticated} = useContext(AuthenticationContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isInvalidPassword()) return;

    handleRequest(URL_BASE + onSubmit.url);
  };

  const handleRequest = async (url) => {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);

    if (![200, 201].includes(response.status)) {
      setError("Credenciais inválidas");
      setInformationBox(true);
      return;
    }

    const responseJson = await response.json();
    if(responseJson.token){
      window.localStorage.setItem("token", responseJson.token);
      setAuthenticated(true)
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
      setAuthenticated(true)
    }

    navigate("/");
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
    <div className="container">
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
