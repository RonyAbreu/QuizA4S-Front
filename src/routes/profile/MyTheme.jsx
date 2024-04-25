import { useEffect, useState } from "react";
import { ApiFetch } from "../../util/ApiFetch";
import Pagination from "../../components/pagination/Pagination";
import Theme from "../../components/theme/Theme";
import Loading from "../../components/loading/Loading";
import SearchComponent from "../../components/searchComponent/SearchComponent";
import NotFoundComponent from "../../components/notFound/NotFoundComponent";

import "./MyTheme.css";

const MyTheme = () => {
  const apiFetch = new ApiFetch();

  const [loading, setLoading] = useState(false);

  const [themes, setThemes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [callBack, setCallBack] = useState({});

  const [themeName, setThemeName] = useState("");

  function changeName(propsThemeName){
    setThemeName(propsThemeName);
  }


  useEffect(() => {
    setLoading(true);
    const promisse = apiFetch.getPages(
      `/theme/creator?page=${currentPage}&name=${themeName}`,
      "Nenhum tema encontrado!"
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

      <Theme themes={themes} setThemes={setThemes} setCallBack={setCallBack} />

      {!loading && themes.length == 0 && (
        <NotFoundComponent title="Tema não encontrado"/>
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
