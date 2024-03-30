import { useLocation, useNavigate } from 'react-router-dom'
import '../css/Home.css'

const Home = () => {
  const path = useLocation()
  const navigate = useNavigate()

  function handleNavigate(){
    if(path.pathname === "/user"){
      navigate("/user/theme")
    } else {
      navigate("/theme")
    }
  }

  return (
    <div className='home'>
        <h1 className='home-title'>Aprenda se divertindo</h1>
        <p className='home-description'>Clique no botão abaixo e inicie um Quiz agora!</p>
        <button className='home-button' type='button' onClick={handleNavigate}>Jogar</button>
    </div>
  )
}

export default Home