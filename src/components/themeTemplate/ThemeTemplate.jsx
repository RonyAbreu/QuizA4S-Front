// Components
import { useLayoutEffect, useState } from "react";
import Loading from "../loading/Loading";
import SearchComponent from "../searchComponent/SearchComponent";
import NotFoundComponent from "../notFound/NotFoundComponent";
import { ApiFetch } from "../../util/ApiFetch";
import Pagination from "../pagination/Pagination";
import { DEFAULT_IMG } from "../../App";

//Css
import "./ThemeTemplate.css";

const ThemeTemplate = ({ baseUrl, onClickFunction }) => {
  const apiFetch = new ApiFetch();


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
        setTotalPages(0);
        setThemes([])
        return;
      }

      setLoading(false);
      setTotalPages(response.totalPages);
      setThemes(response.data);
    });
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
