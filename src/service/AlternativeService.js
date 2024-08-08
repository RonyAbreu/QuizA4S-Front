import { apiAxios } from "../axios/AxiosConfig";

export class AlternativeService {
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

  insertAlternative(idQuestion, alternative) {
    return this.handleRequest("post", `/alternative/${idQuestion}`, alternative);
  }

  insertAllAlternatives(idQuestion, alternatives) {
    return this.handleRequest("post", `/alternative/all/${idQuestion}`, alternatives);
  }

  removeAlternative(alternativeId) {
    return this.handleRequest("delete", `/alternative/${alternativeId}`);
  }

  updateAlternative(alternativeId, alternativeUpdate) {
    return this.handleRequest("patch", `/alternative/${alternativeId}`, alternativeUpdate);
  }
}