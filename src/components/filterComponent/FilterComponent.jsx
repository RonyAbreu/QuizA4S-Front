import { useState } from "react";
import "./FilterComponent.css";
import { ApiFetch } from "../../util/ApiFetch";
import Loading from "../loading/Loading";

const FilterComponent = ({
  basePath,
  onData,
  setResponses,
  setCurrentPage,
  setTotalPages,
}) => {
  const apiFetch = new ApiFetch();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    date: "",
    questionId: "",
  });

  function changeData(name, value) {
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function filterResponses() {
    if (onData) {
      onData(data);
    }

    setLoading(true);
    const promisse = apiFetch.getPages(`${basePath}&date=${data.date}&questionId=${data.questionId}`, "Nenhuma resposta encontrada");

    promisse.then((response) => {
      if (!response.success) {
        setLoading(false);
        setResponses([]);
        setTotalPages(0);
        setCurrentPage(0);
      }

      setLoading(false);
      setResponses(response.data);
      setTotalPages(response.totalPages);
    });
  }

  return (
    <div className="filter-container">
      <div className="filter-body">
        <p>Filtre por:</p>

        <label className="filter-input">
          <span>Data</span>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={(e) => changeData("date", e.target.value)}
          />
        </label>

        <label className="filter-input">
          <span>ID da Questão</span>
          <input
            type="number"
            name="questionId"
            min={1}
            value={data.questionId}
            onChange={(e) => changeData("questionId", e.target.value)}
          />
        </label>

        <button type="button" onClick={filterResponses}>
          Filtrar
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default FilterComponent;
