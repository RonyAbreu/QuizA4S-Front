// Components
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

//Css
import "./ThemeTemplate.css";
import SearchComponent from "../searchComponent/SearchComponent";
import NotFoundComponent from "../notFound/NotFoundComponent";
import { ApiFetch } from "../../util/ApiFetch";

const defaultImgUrl =
  "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg";

const ThemeTemplate = ({ url, onClickFunction }) => {
  const apiFetch = new ApiFetch();

  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isNotFound, setNotFound] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);

    const promisse = apiFetch.getPagesWithToken(
      `${url}?page=${currentPage}`,
      "Tema não encontrado"
    );

    promisse.then((response) => {
      if (!response.success) {
        setLoading(false);
        setNotFound(true);
        return;
      }

      setNotFound(false);
      setLoading(false);
      setThemes(response.data);
      setIsFirstPage(currentPage === 0);
      setIsLastPage(currentPage === response.totalPages - 1);
    });
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
          url={`/theme/search?page=${currentPage}&name=`}
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

          {isNotFound && <NotFoundComponent title="Tema não encontrado!" />}
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