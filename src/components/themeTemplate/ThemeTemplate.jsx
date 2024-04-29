// Components
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Loading from "../loading/Loading";
import SearchComponent from "../searchComponent/SearchComponent";
import NotFoundComponent from "../notFound/NotFoundComponent";
import { ApiFetch } from "../../util/ApiFetch";
import Pagination from "../pagination/Pagination";
import { DEFAULT_IMG } from "../../App";

//Css
import "./ThemeTemplate.css";
import { AuthenticationContext } from "../../context/AutenticationContext";

const ThemeTemplate = ({ baseUrl, setBaseUrl, onClickFunction }) => {
  const apiFetch = new ApiFetch();

  const { isAuthenticated } = useContext(AuthenticationContext);

  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [themeName, setThemeName] = useState("");

  function changeName(propsThemeName) {
    setThemeName(propsThemeName);
  }

  useLayoutEffect(() => {
    setLoading(true);

    const promisse = apiFetch.getPages(
      `${baseUrl}?page=${currentPage}&name=${themeName}`,
      "Tema não encontrado"
    );

    promisse.then((response) => {
      if (!response.success) {
        setLoading(false);
        return;
      }

      setLoading(false);
      setTotalPages(response.totalPages);
      setThemes(response.data);
    });
  }, [currentPage, baseUrl]);

  useEffect(() => {
    const btnAllThemes = document.getElementById("btn-all-themes");
    const btnMyThemes = document.getElementById("btn-my-themes");

    if (btnAllThemes && btnMyThemes) {
      if (!baseUrl.includes("creator")) {
        btnMyThemes.classList.remove("selected-btn");
        btnAllThemes.classList.add("selected-btn");
      } else {
        btnAllThemes.classList.remove("selected-btn");
        btnMyThemes.classList.add("selected-btn");
      }
    }
  }, [baseUrl]);

  return (
    <div className="container-theme outlet">
      <SearchComponent
        title="Escolha o tema do seu Quiz"
        url={`${baseUrl}?page=${currentPage}&name=`}
        placeholder="Digite o nome de um tema"
        onSearch={changeName}
        setCurrentPage={setCurrentPage}
        setData={setThemes}
        setTotalPages={setTotalPages}
      />

      {isAuthenticated && (
        <div className="container-theme-buttons">
          <button
            onClick={() => setBaseUrl("/theme")}
            className="theme-buttons"
            id="btn-all-themes"
          >
            Todos os temas
          </button>
          <button
            onClick={() => setBaseUrl("/theme/creator")}
            className="theme-buttons"
            id="btn-my-themes"
          >
            Meus temas
          </button>
        </div>
      )}

      <div className="container-theme-data">
        {themes &&
          themes.map((theme) => (
            <div
              className="theme"
              key={theme.id}
              onClick={() => onClickFunction(theme.id)}
            >
              <img
                src={theme.imageUrl == null || theme.imageUrl == "" ? DEFAULT_IMG : theme.imageUrl}
                alt="theme-image"
                loading="lazy"
              />
              <p>{theme.name}</p>
            </div>
          ))}

        {!loading && themes.length == 0 && (
          <NotFoundComponent title="Tema não encontrado!" />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {loading && <Loading />}
    </div>
  );
};

export default ThemeTemplate;
