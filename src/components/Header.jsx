import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-a4s.png";

import "../css/Header.css";

const Header = ({ home, register, login, profile }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo Apps4Society" className="logo" />
      </Link>

      <h1 className="title">Quiz A4S</h1>

      <ul className="nav-bar">
        {!home && (
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Início
          </NavLink>
        )}

        {!register && (
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Cadastrar-se
          </NavLink>
        )}

        {!login && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Login
          </NavLink>
        )}

        {!profile && (
          <i class="bi bi-person-circle profile"></i>
        )}
      </ul>
    </header>
  );
};

export default Header;
