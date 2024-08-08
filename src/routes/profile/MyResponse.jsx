import { useEffect, useState } from "react";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import NotFoundComponent from "../../components/notFound/NotFoundComponent";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { ResponseService } from "../../service/ResponseService";

import "./MyResponse.css";

const MyResponse = () => {
  const responseService = new ResponseService();

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [date, setDate] = useState("");
  const [questionId, setQuestionId] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const response = await responseService.findResponsesByQuestionCreator(
        currentPage
      );

      setLoading(false);
      if (!response.success) {
        setResponses([]);
        setTotalPages(0);
        setCurrentPage(0);
        return;
      }

      setResponses(response.data.content);
      setTotalPages(response.data.totalPages);
    }

    fetchData();
  }, [currentPage]);

  function changeData(propsData) {
    setDate(propsData.date);
    setQuestionId(propsData.questionId);
  }

  return (
    <div className="container-my-response">
      <FilterComponent
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
                  <td>
                    {response.alternative.correct ? (
                      <BsCheckCircleFill className="correct-response" />
                    ) : (
                      <BsFillXCircleFill className="fail-response" />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!loading && responses.length === 0 && (
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
