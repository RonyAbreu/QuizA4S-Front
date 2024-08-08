import { apiAxios } from "../axios/AxiosConfig";

export class ScoreService {
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

  insertScore(score, userId, themeId) {
    return this.handleRequest("post", `/score/${userId}/${themeId}`, score);
  }

  findRankingByTheme(themeId) {
    return this.handleRequest("get", `/score/${themeId}`);
  }
}