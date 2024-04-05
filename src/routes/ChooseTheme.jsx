// Components
import { useEffect, useState } from "react";
import { URL_BASE } from "../App";

//Css
import "../css/ChooseTheme.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const url = `${URL_BASE}/theme`;

const ChooseTheme = () => {
  const [themeName, setThemeName] = useState("");
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const [currentPage, setCurrentPage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    async function getAllThemes() {
      setLoading(true);
      const response = await fetch(`${url}?page=${currentPage}`);
      const page = await response.json();
      const themes = page.content;
      setLoading(false);
      setThemes(themes);
      setIsFirstPage(currentPage === 0);
      setIsLastPage(currentPage === page.totalPages - 1);
    }

    getAllThemes();
  }, [currentPage]);

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

  function startQuiz(id) {
    const quizPath = path.includes("user") ? "/user/theme/quiz/" : "/theme/quiz/";
    navigate(`${quizPath}${id}`);
  }

  function alterPage(direction) {
    if (direction === "prev" && !isFirstPage) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && !isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  }

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
            {loading && <Loading />}
          </div>
        </div>
      </div>

      <div className="pagination-buttons">
        <button
          type="button"
          onClick={() => alterPage("prev")}
          disabled={isFirstPage}
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => alterPage("next")}
          disabled={isLastPage}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default ChooseTheme;