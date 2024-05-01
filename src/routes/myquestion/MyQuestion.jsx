import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import SearchComponent from "../../components/searchComponent/SearchComponent";
import { ApiFetch } from "../../util/ApiFetch";
import Loading from "../../components/loading/Loading";
import InformationBox from "../../components/informationBox/InformationBox";
import ConfirmBox from "../../components/confirmBox/ConfirmBox";
import UpdateBox from "../../components/updateBox/UpdateBox";
import NotFoundComponent from "../../components/notFound/NotFoundComponent";
import MyAlternative from "./MyAlternative";
import { DEFAULT_IMG } from "../../App";

import "./MyQuestion.css";

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

  const [loading, setLoading] = useState(false);
  const [isConfirmBox, setConfirmBox] = useState(false);
  const [isUpdateBox, setUpdateBox] = useState(false);
  const [isInformationBox, setInformationBox] = useState(false);

  const [callBack, setCallBack] = useState();

  const [informationData, setInformationData] = useState({
    text: "",
    icon: "exclamation",
    color: "red",
  });

  const [questionTitle, setQuestionTitle] = useState("");

  function changeName(propsQuestionTitle){
    setQuestionTitle(propsQuestionTitle);
  }

  useEffect(() => {
    setLoading(true);
    const promisse = apiFetch.getPages(
      `/question/creator/theme/${themeId}?page=${currentPage}&title=${questionTitle}`,
      "Questões não encontradas ou não cadastradas"
    );

    promisse.then((response) => {
      if (!response.success) {
        activeInformationBox(true, response.message);
        setLoading(false);
      }

      setLoading(false);
      setTotalPages(response.totalPages);
      setQuestions(response.data);
    });
  }, [currentPage, callBack]);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    imageUrl: "",
  });

  const inputs = [
    {
      label: "Novo título",
      type: "text",
      placeholder: "Digite o título da questão",
      value: newQuestion.title,
      maxLength: 170,
      minLength: 4,
    },
    {
      label: "URL da Imagem",
      type: "text",
      placeholder: "Digite a url da imagem",
      value: newQuestion.imageUrl,
      maxLength: 255,
      minLength: 0,
    },
  ];

  function changeValue(value, label) {
    switch (label) {
      case "Novo título":
        setNewQuestion({ ...newQuestion, title: value });
        return;
      case "URL da Imagem":
        setNewQuestion({ ...newQuestion, imageUrl: value });
        return;
      default:
        return "";
    }
  }

  const [questionId, setQuestionId] = useState(0);

  function showConfirmBox(id, title, imageUrl) {
    setQuestionId(id);
    setNewQuestion({ title: title, imageUrl: imageUrl });
    setConfirmBox(true);
  }

  function showUpdateBox(id, title, imageUrl) {
    setQuestionId(id);
    setNewQuestion({ title: title, imageUrl: imageUrl });
    setUpdateBox(true);
  }

  function removeQuestion() {
    setLoading(true);
    const promisse = apiFetch.delete(`/question/${questionId}`, false);

    promisse.then((response) => {
      if (!response.removed) {
        activeInformationBox(true, response.message);
        setLoading(false);
        return;
      }

      activeInformationBox(false, "Questão removida com sucesso!");
      setCallBack({})
      setLoading(false);
      setConfirmBox(false);
    });
  }

  function updateQuestion() {
    setLoading(true);
    const promisse = apiFetch.patch(`/question/${questionId}`, newQuestion);

    promisse.then((response) => {
      if (!response.success) {
        activeInformationBox(true, response.message);
        setLoading(false);
        return;
      }

      activeInformationBox(false, "Questão atualizada com sucesso");
      setCallBack({});
      setLoading(false);
      setUpdateBox(false);
    });
  }

  function activeInformationBox(isFail, message) {
    if (isFail) {
      setInformationData((prevData) => {
        return { ...prevData, text: message };
      });
      setInformationBox(true);
    } else {
      setInformationData((prevData) => {
        return { ...prevData, text: message, color: "green", icon: "check" };
      });
      setInformationBox(true);
    }
  }

  const [alternatives, setAlternatives] = useState([]);
  const [isShowAlternatives, setShowAlternatives] = useState(false);

  function showAlternatives(alternatives) {
    setAlternatives(alternatives);
    setShowAlternatives(true);
  }

  return (
    <div className="container-my-question outlet">
      <div className="my-question">
        <div className="my-question-header">
          <div className="theme-info">
            <p>Tema:</p>
            <img src={themeUrl} alt="image-theme" loading="lazy"/>
            <span>{themeName}</span>
          </div>

          <h1>Minhas questões</h1>
        </div>

        <div className="my-question-body">
          <SearchComponent
            placeholder="Digite o título de uma questão"
            setData={setQuestions}
            url={`/question/creator/theme/${themeId}?page=${currentPage}&title=`}
            setCurrentPage={setCurrentPage}
            setTotalPages={setTotalPages}
            onSearch={changeName}
          />

          <div className="my-question-data">
            {questions &&
              questions.map((question) => (
                <div key={question.id} className="question-data">
                  <img
                    src={
                      question.imageUrl == null || question.imageUrl == ""
                        ? DEFAULT_IMG
                        : question.imageUrl
                    }
                    alt="image-question"
                  />
                  <div className="question-info">
                    <p>{question.title}</p>
                    <button
                      type="button"
                      onClick={() => showAlternatives(question.alternatives)}
                    >
                      Alternativas
                    </button>
                  </div>

                  <div className="question-action">
                    <i
                      className="bi bi-trash-fill"
                      onClick={() =>
                        showConfirmBox(
                          question.id,
                          question.title,
                          question.imageUrl
                        )
                      }
                    ></i>
                    <i
                      className="bi bi-pencil-square"
                      onClick={() =>
                        showUpdateBox(
                          question.id,
                          question.title,
                          question.imageUrl
                        )
                      }
                    ></i>
                  </div>
                </div>
              ))}

            {!loading && questions.length == 0 && (
              <NotFoundComponent title="Questão não encontrada" />
            )}
          </div>
          
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      {isShowAlternatives && (
        <MyAlternative
          alternatives={alternatives}
          setShowAlternatives={setShowAlternatives}
          setCallBack={setCallBack}
        />
      )}

      {isConfirmBox && (
        <ConfirmBox
          title="Deseja remover esta questão?"
          textBtn1="Sim"
          textBtn2="Não"
          onClickBtn1={removeQuestion}
          onClickBtn2={() => setConfirmBox(false)}
        />
      )}
      {isUpdateBox && (
        <UpdateBox
          title="Atualizar Questão"
          inputs={inputs}
          onChange={changeValue}
          onClickSave={updateQuestion}
          onClickCancel={() => setUpdateBox(false)}
        />
      )}
      {isInformationBox && (
        <InformationBox
          text={informationData.text}
          color={informationData.color}
          icon={informationData.icon}
          closeBox={() => setInformationBox(false)}
        />
      )}

      {loading && <Loading />}
    </div>
  );
};

export default MyQuestion;