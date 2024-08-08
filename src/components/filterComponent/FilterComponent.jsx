import { useState } from "react";
import "./FilterComponent.css";
import { ApiFetch } from "../../util/ApiFetch";
import Loading from "../loading/Loading";
import { BsFillTrash3Fill, BsSearch } from "react-icons/bs";

const FilterComponent = ({
  onData,
  setResponses,
  setCurrentPage,
  setTotalPages,
}) => {
  const apiFetch = new ApiFetch();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [data, setData] = useState({
    date: "",
    questionId: "",
    name: "",
    startDate: "",
    endDate: "",
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
    let endpoint = `/response/question/creator`;

    switch (selectedOption) {
      case "QUESTION":
        endpoint += `/id?questionId=${data.questionId}`;
        break;
      case "DATE":
        endpoint += `/date?currentDate=${data.startDate}&finalDate=${data.endDate}`;
        break;
      case "NAME":
        endpoint += `/name?name=${data.name}`;
        break;
      default:
        break;
    }

    const promisse = apiFetch.getPages(endpoint, "Nenhuma resposta encontrada");
    promisse.then((response) => {
      setLoading(false);
      if (!response.success) {
        setResponses([]);
        setTotalPages(0);
        setCurrentPage(0);
        return;
      }

      setResponses(response.data);
      setTotalPages(response.totalPages);
    });
  }

  function clearInputs() {
    setSelectedOption("");
    setData({
      date: "",
      questionId: "",
      name: "",
      startDate: "",
      endDate: "",
    });
    
    setLoading(true);
    const endpoint = `/response/question/creator`;
    const promisse = apiFetch.getPages(endpoint, "Nenhuma resposta encontrada");

    promisse.then((response) => {
      setLoading(false);
      if (!response.success) {
        setResponses([]);
        setTotalPages(0);
        setCurrentPage(0);
        return;
      }

      setResponses(response.data);
      setTotalPages(response.totalPages);
    });
  }

  return (
    <div className="filter-container">
      <div className="filter-body">
        <div className="container-filter-input">
          <label className="filter-input">
            <span>Selecione um filtro</span>
            <select
              name="option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Vazio</option>
              <option value="QUESTION">ID da Questão</option>
              <option value="DATE">Data</option>
              <option value="NAME">Nome do Usuário</option>
            </select>
          </label>

          {selectedOption === "QUESTION" && (
            <label className="filter-input">
              <span>ID da Questão</span>
              <input
                type="text"
                placeholder="Digite o ID"
                value={data.questionId}
                onChange={(e) => changeData("questionId", e.target.value)}
              />
            </label>
          )}

          {selectedOption === "NAME" && (
            <label className="filter-input">
              <span>Nome do Usuário</span>
              <input
                type="text"
                placeholder="Digite o nome do usuário"
                value={data.name}
                onChange={(e) => changeData("name", e.target.value)}
              />
            </label>
          )}

          {selectedOption === "DATE" && (
            <>
              <label className="filter-input">
                <span>Data Inicial</span>
                <input
                  type="date"
                  value={data.startDate}
                  onChange={(e) => changeData("startDate", e.target.value)}
                />
              </label>
              <label className="filter-input">
                <span>Data Final</span>
                <input
                  type="date"
                  value={data.endDate}
                  onChange={(e) => changeData("endDate", e.target.value)}
                />
              </label>
            </>
          )}
        </div>

        <button type="button" onClick={filterResponses}>
          Filtrar
        </button>

        <button type="button" onClick={clearInputs}>
          Limpar
        </button>

        <BsSearch className="icon" onClick={filterResponses}/>

        <BsFillTrash3Fill className="icon" id="trash" onClick={clearInputs}/>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default FilterComponent;