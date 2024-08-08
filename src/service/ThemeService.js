import { apiAxios } from "../axios/AxiosConfig";

export class ThemeService {
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

  insertTheme(theme) {
    return this.handleRequest("post", "/theme", theme);
  }

  removeTheme(themeId) {
    return this.handleRequest("delete", `/theme/${themeId}`);
  }

  findAllThemes(name, currentPage) {
    return this.handleRequest("get", `/theme?name=${name}&page=${currentPage}`);
  }

  findThemesByCreator(name, currentPage) {
    return this.handleRequest("get", `/theme/creator?name=${name}&page=${currentPage}`);
  }

  findThemeById(idTheme) {
    return this.handleRequest("get", `/theme/${idTheme}`);
  }

  updateTheme(themeId, themeUpdate) {
    return this.handleRequest("patch", `/theme/${themeId}`, themeUpdate);
  }
}