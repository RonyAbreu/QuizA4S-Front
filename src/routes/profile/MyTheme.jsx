import { useEffect, useState } from "react";
import { URL_BASE } from "../../App";
import { ApiFetch } from "../../util/ApiFetch";
import "./MyTheme.css";
import Pagination from "../../components/pagination/Pagination";

const url = `${URL_BASE}/theme/creator`;

const MyTheme = () => {
  const apiFetch = new ApiFetch();

  const [themes, setThemes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const promisse = apiFetch.getPagesWithToken(`${url}?page=`);
    promisse.then((response) => {
      if (!response.success) {
        alert("Nenum tema cadastrado!");
        return;
      }
      
      setTotalPages(response.totalPages);
      setThemes(response.data);
    });
  }, []);

  return (
    <div className="container-my-theme">
      <div className="my-theme-search">
        <input type="text" name="name" placeholder="Digite o nome do tema" />
      </div>

      <div className="my-theme-list">
        {themes &&
          themes.map((theme) => (
            <div key={theme.id} className="theme-data">
              <img src={theme.imageUrl} alt="image" />
              <div className="theme-questions">
                <p>{theme.name}</p>
                <button type="button">Questões</button>
              </div>
              <div className="theme-action">
                <i className="bi bi-trash-fill"></i>
                <i className="bi bi-pencil-square"></i>
              </div>
            </div>
          ))}
      </div>

      <Pagination totalPages={totalPages} />

      {themes.length == 0 && <h2>Nenhum tema cadastrado</h2>}
    </div>
  );
};

export default MyTheme;
