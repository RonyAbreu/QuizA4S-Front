import { useEffect, useState } from "react";
import MyTheme from "./MyTheme";
import MyResponse from "./MyResponse";
import Loading from "../../components/loading/Loading";
import InformationBox from "../../components/informationBox/InformationBox";
import ConfirmBox from "../../components/confirmBox/ConfirmBox";
import UpdateBox from "../../components/updateBox/UpdateBox";
import MyStatistics from "./MyStatistics";
import { UserService } from "./../../service/UserService";

import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const userService = new UserService();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);

  const [informationData, setInformationData] = useState({
    text: "",
    icon: "exclamation",
    color: "red",
  });

  const confirmBoxData = {
    title: "Deseja remover sua conta?",
    textBtn1: "Sim",
    textBtn2: "Não",
  };

  const [currentItem, setCurrentItem] = useState(0);
  const componentsItens = [<MyTheme />, <MyResponse />, <MyStatistics />];

  useEffect(() => {
    const btnQuiz = document.getElementById("btn-quiz");
    const btnResponse = document.getElementById("btn-response");
    const btnStatistic = document.getElementById("btn-statistic");

    if (currentItem === 0) {
      btnQuiz.classList.add("selected-btn");
      btnResponse.classList.remove("selected-btn");
      btnStatistic.classList.remove("selected-btn");
    } else if (currentItem === 1) {
      btnQuiz.classList.remove("selected-btn");
      btnResponse.classList.add("selected-btn");
      btnStatistic.classList.remove("selected-btn");
    } else {
      btnQuiz.classList.remove("selected-btn");
      btnResponse.classList.remove("selected-btn");
      btnStatistic.classList.add("selected-btn");
    }
  }, [currentItem]);

  const { uuid, name, email } = JSON.parse(localStorage.getItem("user"));

  const [newName, setNewName] = useState("");

  const updateBoxData = {
    title: "Editar perfil",
    inputs: [
      {
        label: "Novo nome:",
        type: "text",
        placeholder: "Digite seu novo nome",
        value: newName,
        maxLength: 30,
        minLength: 3,
      },
    ],
  };

  const userUpdate = {
    name: newName,
  };

  async function updateAccount() {
    setLoading(true);
    const response = await userService.updateUser(uuid, userUpdate);
    if (!response.success) {
      activeInformationBox(true, response.message);
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ uuid: uuid, name: userUpdate.name, email: email })
    );
    setLoading(false);

    activeInformationBox(false, "Nome atualizado com sucesso!");

    setUpdateBox(false);
  }

  async function removeAccount() {
    setLoading(true);
    const response = await userService.removeUser(uuid);
    setLoading(false);

    if (!response.success) {
      setInformationData((prevData) => {
        return { ...prevData, text: response.message };
      });
      setInformationBox(true);
    }

    navigate("/");
  }

  function activeInformationBox(isFail, message) {
    if (isFail) {
      setInformationData((prevData) => {
        return { ...prevData, text: message };
      });
      setInformationBox(true);
    } else {
      setInformationData((prevData) => {
        return { ...prevData, text: message, icon: "check", color: "green" };
      });
      setInformationBox(true);
    }
  }

  function showConfirmationBox() {
    setConfirmBox(true);
  }

  function showUpdateBox() {
    setUpdateBox(true);
  }

  return (
    <div className="container-profile outlet">
      <div className="user-profile">
        <i className="bi bi-person-circle"></i>
        <p>{name}</p>
        <p>{email}</p>
        <button
          id="user-profile-btn-update"
          type="button"
          onClick={showUpdateBox}
        >
          Editar Perfil
        </button>
        <button
          id="user-profile-btn-delete"
          type="button"
          onClick={showConfirmationBox}
        >
          Excluir Conta
        </button>
      </div>

      <div className="container-user-itens">
        <div className="select-user-item">
          <button
            type="button"
            onClick={() => setCurrentItem(0)}
            id="btn-quiz"
            className="select-user-btn"
          >
            Meus Temas
          </button>
          <button
            type="button"
            onClick={() => setCurrentItem(1)}
            id="btn-response"
            className="select-user-btn"
          >
            Painel de Respostas
          </button>
          <button
            type="button"
            onClick={() => setCurrentItem(2)}
            id="btn-statistic"
            className="select-user-btn"
          >
            Estatistícas
          </button>
        </div>

        <div className="user-itens">{componentsItens[currentItem]}</div>
      </div>

      {loading && <Loading />}
      {informationBox && (
        <InformationBox
          text={informationData.text}
          closeBox={() => setInformationBox(false)}
          icon={informationData.icon}
          color={informationData.color}
        />
      )}
      {confirmBox && (
        <ConfirmBox
          title={confirmBoxData.title}
          textBtn1={confirmBoxData.textBtn1}
          textBtn2={confirmBoxData.textBtn2}
          onClickBtn1={removeAccount}
          onClickBtn2={() => setConfirmBox(false)}
        />
      )}
      {updateBox && (
        <UpdateBox
          title={updateBoxData.title}
          inputs={updateBoxData.inputs}
          onChange={setNewName}
          onClickSave={updateAccount}
          onClickCancel={() => setUpdateBox(false)}
        />
      )}
    </div>
  );
};

export default Profile;
