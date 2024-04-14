import { useState } from "react";
import MyQuiz from "./MyQuiz";
import MyResponse from "./MyResponse";
import { ApiFetch } from "../../api/ApiFetch";

import "./Profile.css";

const Profile = () => {

  const apiFetch = new ApiFetch();

  const [currentItem, setCurrentItem] = useState(0)
  const componentsItens = [
    <MyQuiz />,
    <MyResponse />
  ]

  const { uuid, name, email } = JSON.parse(localStorage.getItem('user'))

  function updateAccount(){
    

  }

  function removeAccount(){
    const options = confirm("Deseja remover sua conta?");

    if(!options) return;

    const promisse = apiFetch.delete(`/user/${uuid}`, true);
    promisse.then(response =>{
      if(!response.removed){
        alert(response.message)
        return;
      }
    })

    alert("Conta removida com sucesso!")
  }

  return (
    <div className="container-profile outlet">
        <div className="user-profile">
          <i className="bi bi-person-circle"></i>
          <p>{name}</p>
          <p>{email}</p>
          <button id="user-profile-btn-update" type="button" onClick={updateAccount}>Editar Perfil</button>
          <button id="user-profile-btn-delete" type="button" onClick={removeAccount}>Excluir Conta</button>
        </div>

        <div className="container-user-itens">
          <div className="select-user-item">
            <button type="button" onClick={() => setCurrentItem(0)}>Meus Quizzes</button>
            <button type="button" onClick={() => setCurrentItem(1)}>Minhas Respostas</button>
          </div>

          <div className="user-itens">
            {componentsItens[currentItem]}
          </div>
        </div>
    </div>
  )
}

export default Profile