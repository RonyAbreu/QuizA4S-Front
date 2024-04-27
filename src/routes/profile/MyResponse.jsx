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
  console.log(responses);

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

      <div className="my-response-data"></div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {loading && <Loading />}
      {!loading && responses.length == 0 && (
        <NotFoundComponent title="Nenhuma resposta encontrada" />
      )}
    </div>
  );
};

export default MyResponse;
