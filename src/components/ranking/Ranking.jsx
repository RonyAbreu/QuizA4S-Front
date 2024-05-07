import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import { ApiFetch } from "./../../util/ApiFetch";

import "./Ranking.css";

const Ranking = ({ themeId }) => {
  const apiFetch = new ApiFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { name: themeName } = JSON.parse(localStorage.getItem("theme"));

  const [ranking, setRanking] = useState([]);

  const [isNotFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    const promisse = apiFetch.get(
      `/score/${themeId}`,
      "Nenhuma pontuação cadastrada"
    );
    promisse.then((response) => {
      if (!response.success) {
        setLoading(false);
        setNotFound(true);
        return;
      }

      setLoading(false);
      setRanking(response.data);
    });
  }, []);

  return (
    <div className="container-ranking">
      <div className="ranking">
        <div className="ranking-header">
          <h2>Ranking</h2>

          <p>Tema: {themeName}</p>
        </div>

        <div className="table-ranking">
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {ranking && ranking.map((score) => (
                <tr key={score.id}>
                  <td>{score.user.name}</td>
                  <td>{score.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isNotFound && <h2>Nenhuma pontuação cadastrada</h2>}

        <button type="button" onClick={() => navigate("/theme")}>
          Voltar
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Ranking;
