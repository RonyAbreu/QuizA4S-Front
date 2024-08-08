import { apiAxios } from "../axios/AxiosConfig";

export class ResponseService {
  async handleRequest(method, url, data = null) {
    const response = {
      data: {},
      message: "",
      success: false
    };

    try {
      const asyncResponse = await apiAxios[method](url, data);
      response.data = asyncResponse.data;
      response.success = true;
    } catch (error) {
      response.message = error.response?.data.message || "An error occurred";
    }

    return response;
  }

  insertResponse(idUser, idQuestion, idAlternative) {
    return this.handleRequest("post", `/response/${idUser}/${idQuestion}/${idAlternative}`);
  }

  findResponsesByUser(currentPage) {
    return this.handleRequest("get", `/response/user?page=${currentPage}`);
  }

  findResponsesByQuestionCreator(currentPage) {
    return this.handleRequest("get", `/response/question/creator?page=${currentPage}`);
  }

  findResponsesByQuestionCreatorId(questionId, currentPage) {
    return this.handleRequest("get", `/response/question/creator/id?questionId=${questionId}&page=${currentPage}`);
  }

  findResponsesByUserName(name, currentPage) {
    return this.handleRequest("get", `/response/question/creator?name=${name}&page=${currentPage}`);
  }

  findResponsesByDate(currentDate, finalDate, currentPage) {
    return this.handleRequest("get", `/response/question/date?currentDate=${currentDate}&finalDate=${finalDate}&page=${currentPage}`);
  }

  findResponsesStatistics(themeName) {
    return this.handleRequest("get", `/response/statistic/${themeName}`);
  }

  removeResponse(responseId) {
    return this.handleRequest("delete", `/response/${responseId}`);
  }
}