import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        O Quiz A4S é Open Source! E foi desenvolvido pelo projeto de extensão
        Apps4Society, da Universidade Federal da Paraíba Campus IV - Rio Tinto
      </p>
      <button type="button" className="footer-button">
        <a href="">Repositório do Projeto</a>
      </button>
      <span>&copy; Todos os direitos reservados ao Apps4Society - 2024</span>
    </footer>
  );
};

export default Footer;
