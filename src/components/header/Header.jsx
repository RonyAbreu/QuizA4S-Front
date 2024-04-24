import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo-a4s.png";

import "./Header.css";
import { useState } from "react";
import Menu from "../menu/Menu";

const Header = ({ isAuth }) => {
  const [menu, setMenu] = useState(false);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo Apps4Society" className="logo" />
      </Link>

      <h1 className="title">Quiz A4S</h1>

      <ul className="nav-bar">
        {!isAuth && (
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Início
          </NavLink>
        )}

        {!isAuth && (
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Cadastrar-se
          </NavLink>
        )}

        {!isAuth && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Login
          </NavLink>
        )}

      </ul>
      {isAuth && (
          <i className="bi bi-list profile" onClick={() => setMenu(true)}></i>
        )}

      {!isAuth && (
        <i className="bi bi-list menu-mobile" onClick={() => setMenu(true)}></i>
      )}

      {menu && <Menu setMenu={setMenu} isAuth={isAuth}/>}
    </header>
  );
};

export default Header;
