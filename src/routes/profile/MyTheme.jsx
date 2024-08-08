import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import Theme from "../../components/theme/Theme";
import Loading from "../../components/loading/Loading";
import SearchComponent from "../../components/searchComponent/SearchComponent";
import NotFoundComponent from "../../components/notFound/NotFoundComponent";
import { ThemeService } from "../../service/ThemeService";

import "./MyTheme.css";

const MyTheme = () => {
  const themeService = new ThemeService();

  const [loading, setLoading] = useState(false);

  const [themes, setThemes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [callBack, setCallBack] = useState({});

  const [themeName, setThemeName] = useState("");

  function changeName(propsThemeName) {
    setThemeName(propsThemeName);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await themeService.findThemesByCreator(
        themeName,
        currentPage
      );

      setLoading(false);

      if (!response.success) {
        return;
      }

      setTotalPages(response.data.totalPages);
      setThemes(response.data.content);
    }

    fetchData();
  }, [currentPage, callBack]);

  return (
    <div className="container-my-theme">
      <SearchComponent
        placeholder="Digite o nome de um tema"
        setData={setThemes}
        url={`/theme/creator?page=${currentPage}&name=`}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
        onSearch={changeName}
      />

      <Theme
        themes={themes}
        setThemes={setThemes}
        setCurrentPage={setCurrentPage}
        setCallBack={setCallBack}
      />

      {!loading && themes.length == 0 && (
        <NotFoundComponent title="Tema não encontrado" />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {loading && <Loading />}
    </div>
  );
};

export default MyTheme;
