import "./Footer.css";

import LogoA4s from "../../assets/logo-a4s-footer.webp"

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        O Quiz A4S é Open Source! E foi desenvolvido pelo projeto de extensão
        Apps4Society, da Universidade Federal da Paraíba Campus IV - Rio Tinto
      </p>
      <a href="https://apps4society.dcx.ufpb.br/" target="_blank">
        <img src={LogoA4s} alt="logo-a4s" width="150" height="60"/>
      </a>
      <span>&copy; Todos os direitos reservados ao Apps4Society - 2024</span>
    </footer>
  );
};

export default Footer;
