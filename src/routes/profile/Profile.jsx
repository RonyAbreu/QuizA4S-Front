import { useState } from "react";
import MyQuiz from "./MyQuiz";
import MyResponse from "./MyResponse";
import { ApiFetch } from "../../api/ApiFetch";

import "./Profile.css";
import Loading from "../../components/loading/Loading";
import InformationBox from "../../components/informationBox/InformationBox";
import ConfirmBox from "../../components/confirmBox/ConfirmBox";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);

  const [informationData, setInformationData] = useState({
    text: "",
    icon: "exclamation",
    color: "red",
  });

  const [confirmBoxData, setConfirmBoxData] = useState({
    title: "Deseja remover sua conta?",
    textBtn1: "Sim",
    textBtn2: "Não",
  });

  const apiFetch = new ApiFetch();

  const [currentItem, setCurrentItem] = useState(0);
  const componentsItens = [<MyQuiz />, <MyResponse />];

  const { uuid, name, email } = JSON.parse(localStorage.getItem("user"));

  function updateAccount() {}

  function showConfirmationBox(){
    setConfirmBox(true)
  }

  function removeAccount() {
    setLoading(true);
    const promisse = apiFetch.delete(`/user/${uuid}`, true);
    setLoading(false);
    promisse.then((response) => {
      if (!response.removed) {
        alert(response.message);
        return;
      }
    });

    alert("Conta removida com sucesso!");
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
          onClick={updateAccount}
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
          <button type="button" onClick={() => setCurrentItem(0)}>
            Meus Quizzes
          </button>
          <button type="button" onClick={() => setCurrentItem(1)}>
            Minhas Respostas
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
    </div>
  );
};

export default Profile;
