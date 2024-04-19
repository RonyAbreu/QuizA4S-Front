// Components
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

//Css
import "./ThemeTemplate.css";
import SearchComponent from "../searchComponent/SearchComponent";

const defaultImgUrl =
  "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg";

const ThemeTemplate = ({ url, onClickFunction }) => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <SearchComponent
          title="Escolha o tema do seu Quiz"
          url={`${url}/search?name=`}
          placeholder="Digite o nome de um tema"
          setData={setThemes}
        />

        <div className="container-all-themes">
          {themes &&
            themes.map((theme) => (
              <div
                className="theme"
                key={theme.id}
                onClick={() => onClickFunction(theme.id)}
              >
                <img
                  src={theme.imageUrl == null ? defaultImgUrl : theme.imageUrl}
                  alt="theme-image"
                />
                <p>{theme.name}</p>
              </div>
            ))}

          {themes.length == 0 && (
            <h2 className="not-found">Nenhum tema encontrado!</h2>
          )}
          <div className="container-info">{loading && <Loading />}</div>
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

export default ThemeTemplate;