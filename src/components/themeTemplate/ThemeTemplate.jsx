// Components
import { useLayoutEffect, useState } from "react";
import Loading from "../loading/Loading";
import SearchComponent from "../searchComponent/SearchComponent";
import NotFoundComponent from "../notFound/NotFoundComponent";
import Pagination from "../pagination/Pagination";
import { DEFAULT_IMG } from "../../App";
import { ThemeService } from "./../../service/ThemeService";

//Css
import "./ThemeTemplate.css";

const ThemeTemplate = ({ baseUrl, onClickFunction }) => {
  const themeService = new ThemeService();

  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [themeName, setThemeName] = useState("");

  function changeName(propsThemeName) {
    setThemeName(propsThemeName);
  }

  useLayoutEffect(() => {
    async function fetchData() {
      setLoading(true);

      const response = await themeService.findAllThemes(themeName, currentPage);
      setLoading(false);
      if (!response.success) {
        setTotalPages(0);
        setThemes([]);
        return;
      }
      setTotalPages(response.data.totalPages);
      setThemes(response.data.content);
    }

    fetchData();
  }, [currentPage]);

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

      <div className="container-theme-data">
        {themes &&
          themes.map((theme) => (
            <div
              className="theme"
              key={theme.id}
              onClick={() => onClickFunction(theme)}
            >
              <img
                src={
                  theme.imageUrl == null || theme.imageUrl == ""
                    ? DEFAULT_IMG
                    : theme.imageUrl
                }
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
