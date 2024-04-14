import { useState } from "react";
import "./Profile.css";
import MyQuiz from "./MyQuiz";
import MyResponse from "./MyResponse";

const Profile = () => {

  const [currentItem, setCurrentItem] = useState(0)
  const componentsItens = [
    <MyQuiz />,
    <MyResponse />
  ]

  const { name, email } = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="container-profile outlet">
        
        <div className="user-profile">
          <i className="bi bi-person-circle"></i>
          <p>{name}</p>
          <p>{email}</p>
          <button type="button">Editar Perfil</button>
          <button type="button">Excluir Conta</button>
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