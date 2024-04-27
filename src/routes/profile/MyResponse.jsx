import { useEffect, useState } from "react";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import NotFoundComponent from "../../components/notFound/NotFoundComponent";
import { ApiFetch } from "../../util/ApiFetch";

import "./MyResponse.css";

const MyResponse = () => {
  const apiFetch = new ApiFetch();

  const [responses, setResponses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [date, setDate] = useState("");
  const [questionId, setQuestionId] = useState("");

  const basePath = `/response/question/creator?page=${currentPage}&date=${date}&questionId=${questionId}`;

  useEffect(() => {
    setLoading(true);

    const promisse = apiFetch.getPages(basePath, "Resposta não encontrada");

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
  }, [currentPage, totalPages]);

  function changeData(propsData) {
    setDate(propsData.date);
    setQuestionId(propsData.questionId);
  }

  return (
    <div className="container-my-response">
      <FilterComponent
        basePath={`/response/question/creator?page=${currentPage}`}
        onData={changeData}
        setResponses={setResponses}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
      />
      <div className="container-table">
        <table className="response-table">
          <thead className="table-head">
            <tr>
              <th>ID da Questão</th>
              <th>Questão</th>
              <th>Usuário</th>
              <th>Respondeu</th>
              <th>Acertou</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {responses &&
              responses.map((response) => (
                <tr key={response.id}>
                  <td>{response.question.id}</td>
                  <td>{response.question.title}</td>
                  <td>{response.user.name}</td>
                  <td>{response.alternative.text}</td>
                  <td>{response.alternative.correct ? "Sim" : "Não"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!loading && responses.length == 0 && (
        <NotFoundComponent title="Nenhuma resposta encontrada" />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {loading && <Loading />}
    </div>
  );
};

export default MyResponse;
