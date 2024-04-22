import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import SearchComponent from "../../components/searchComponent/SearchComponent";
import { ApiFetch } from "../../util/ApiFetch";
import "./MyQuestion.css";

const defaultImgUrl =
  "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg";

const MyQuestion = () => {
  const apiFetch = new ApiFetch();

  const {
    id: themeId,
    name: themeName,
    imageUrl: themeUrl,
  } = JSON.parse(localStorage.getItem("theme"));

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [questions, setQuestions] = useState([]);

  const basePath = `/question/creator/theme/${themeId}?page=${currentPage}&title=`;

  useEffect(() => {
    const promisse = apiFetch.getPagesWithToken(
      basePath,
      "Questões não encontradas"
    );

    promisse.then((response) => {
      if (!response.success) {
        alert(response.message);
      }

      setTotalPages(response.totalPages);
      setQuestions(response.data);
    });
  }, [currentPage]);

  return (
    <div className="container-my-question outlet">
      <div className="my-question">
        <div className="my-question-header">
          <div className="theme-info">
            <p>Tema:</p>
            <img src={themeUrl} alt="image-theme" />
            <span>{themeName}</span>
          </div>

          <h1>Minhas questões</h1>
        </div>

        <div className="my-question-body">
          <SearchComponent
            placeholder="Digite o título de uma questão"
            setData={setQuestions}
            url={basePath}
          />

          <div className="my-question-data">
            {questions &&
              questions.map((question) => (
                <div key={question.id} className="question-data">
                  <img
                    src={
                      question.imageUrl == null || question.imageUrl == ""
                        ? defaultImgUrl
                        : question.imageUrl
                    }
                    alt="image-question"
                  />
                  <div className="question-info">
                    <p>{question.title}</p>
                    <button type="button">Alternativas</button>
                  </div>

                  <div className="question-action">
                    <i className="bi bi-trash-fill"></i>
                    <i className="bi bi-pencil-square"></i>
                  </div>
                </div>
              ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default MyQuestion;
