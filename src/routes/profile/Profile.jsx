import { useState } from "react";
import MyQuiz from "./MyQuiz";
import MyResponse from "./MyResponse";
import { ApiFetch } from "../../api/ApiFetch";
import Loading from "../../components/loading/Loading";
import InformationBox from "../../components/informationBox/InformationBox";
import ConfirmBox from "../../components/confirmBox/ConfirmBox";
import UpdateBox from "../../components/updateBox/UpdateBox";

import "./Profile.css";

const Profile = () => {
  const apiFetch = new ApiFetch();

  const [loading, setLoading] = useState(false);
  const [informationBox, setInformationBox] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);

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

  const [currentItem, setCurrentItem] = useState(0);
  const componentsItens = [<MyQuiz />, <MyResponse />];

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
      },
    ],
  };

  const userUpdate = {
    name: newName,
  };

  function updateAccount() {
    setLoading(true);
    const promisse = apiFetch.patch(`/user/${uuid}`, userUpdate)
    setLoading(false);

    promisse.then(response =>{
      if(!response.success){
        setInformationData((prevData) =>{
          return {...prevData, text: response.message}
        })
        setInformationBox(true)
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ uuid: uuid, name: userUpdate.name, email: email })
      );

      setUpdateBox(false);
    })
  }

  function removeAccount() {
    setLoading(true);
    const promisse = apiFetch.delete(`/user/${uuid}`, true);
    setLoading(false);
    promisse.then((response) => {
      if (!response.removed) {
        setInformationData((prevData) => {
          return { ...prevData, text: response.message };
        });
        setInformationBox(true);
        return;
      }
    });
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
