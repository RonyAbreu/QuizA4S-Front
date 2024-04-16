import { useEffect, useState } from "react";
import { URL_BASE } from "../../App";
import { ApiFetch } from "../../util/ApiFetch";
import "./MyTheme.css";

const url = `${URL_BASE}/theme/creator`;

const MyTheme = () => {
  const apiFetch = new ApiFetch();

  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const promisse = apiFetch.getPagesWithToken(url);
    promisse.then((response) => {
      if (!response.success) {
        alert("Nenum tema cadastrado!");
        return;
      }

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

      <div className="my-theme-buttons">
          <button type="button">Anterior</button>
          <button type="button">Próximo</button>
      </div>

      {themes.length == 0 && <h2>Nenhum tema cadastrado</h2>}
    </div>
  );
};

export default MyTheme;
