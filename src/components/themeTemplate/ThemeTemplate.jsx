// Components
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import SearchComponent from "../searchComponent/SearchComponent";
import NotFoundComponent from "../notFound/NotFoundComponent";
import { ApiFetch } from "../../util/ApiFetch";
import Pagination from "../pagination/Pagination";

//Css
import "./ThemeTemplate.css";

const defaultImgUrl =
  "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg";

const ThemeTemplate = ({ url, onClickFunction }) => {
  const apiFetch = new ApiFetch();

  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [themeName, setThemeName] = useState("");

  const token = localStorage.getItem("token");

  function changeName(propsThemeName){
    setThemeName(propsThemeName);
  }

  useEffect(() => {
    setLoading(true);

    const promisse = apiFetch.getPages(
      `${url}?page=${currentPage}&name=${themeName}`,
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
  }, [currentPage]);

  return (
    <div className="container-theme outlet">
      <SearchComponent
        title="Escolha o tema do seu Quiz"
        url={`/theme?page=${currentPage}&name=`}
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
              onClick={() => onClickFunction(theme.id)}
            >
              <img
                src={theme.imageUrl == null ? defaultImgUrl : theme.imageUrl}
                alt="theme-image"
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
