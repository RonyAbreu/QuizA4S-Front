// Components
import { useEffect, useState } from "react";
import { URL_BASE } from "../App";

//Css
import "../css/ChooseTheme.css";
import { useLocation, useNavigate } from "react-router-dom";

const url = `${URL_BASE}/theme`;

const ChooseTheme = () => {
  const [themeName, setThemeName] = useState("");
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const [currentPage, setCurrentPage] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  async function searchThemeName(e) {
    const inputName = e.target.value;

    setThemeName(inputName);

    setLoading(true);
    const response = await fetch(`${url}/search?name=${inputName}`);

    const pageOfThemesByName = await response.json();
    const themesByName = pageOfThemesByName.content;
    setLoading(false);

    setThemes(themesByName);
  }

  useEffect(() => {
    async function getAllThemes() {
      setLoading(true);
      const response = await fetch(`${url}?page=${currentPage}`);
      const page = await response.json();

      setFirstPage(page.first);
      setLastPage(page.last);

      const themes = page.content;
      setLoading(false);
      setThemes(themes);
    }

    getAllThemes();
  }, [currentPage]);

  function startQuiz(id) {
    if (path.includes("user")) {
      navigate(`/user/theme/quiz/${id}`);
    } else {
      navigate(`/theme/quiz/${id}`);
    }
  }

  function alterPage(e) {
    const buttonValue = e.target.value;

    if (buttonValue === "prev" && !firstPage) {
      setCurrentPage(currentPage - 1);
    }

    if (buttonValue === "next" && !lastPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(()=>{

    const btnPrev = document.getElementById("prev");
    const btnNext = document.getElementById("next")

    if(firstPage){
      btnPrev.setAttribute("disabled", "disabled")
    } else if(lastPage){
      btnNext.setAttribute("disabled", "disabled")
    } else {
      btnPrev.removeAttribute("disabled")
      btnNext.removeAttribute("disabled")
    }

  }, [firstPage, lastPage])

  return (
    <div className="container-theme outlet">
      <div className="container-theme-data">
        <div className="theme-form">
          <h1>Escolha o tema do seu Quiz</h1>
          <form>
            <input
              type="text"
              placeholder="Digite o nome de um tema"
              value={themeName}
              onChange={searchThemeName}
            />
          </form>
        </div>

        <div className="container-all-themes">
          {themes &&
            themes.map((theme) => (
              <div
                className="theme"
                key={theme.id}
                onClick={() => startQuiz(theme.id)}
              >
                <img src={theme.imageUrl} alt="theme-image" />
                <p>{theme.name}</p>
              </div>
            ))}

          {!themes && <h2 className="not-found">Nenhum tema encontrado!</h2>}
          <div className="container-info">
            {loading && <h2 className="loading">Carregando...</h2>}
          </div>
        </div>
      </div>

      <div className="pagination-buttons">
        <button type="button" onClick={alterPage} value="prev" id="prev">
          Anterior
        </button>
        <button type="button" onClick={alterPage} value="next" id="next">
          Próximo
        </button>
      </div>
    </div>
  );
};

export default ChooseTheme;