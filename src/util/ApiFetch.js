import { URL_BASE } from "../App";

export class ApiFetch {
  constructor() {}

  async getPages(basePath, messageNotFound) {
    let info = {
      message: "",
      success: false,
      data: [],
      totalPages: 0,
    };

    const token = localStorage.getItem("token");

    let response;

    if (token) {
      response = await fetch(`${URL_BASE}${basePath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(`${URL_BASE}${basePath}`);
    }

    if ([403, 500].includes(response.status)) {
      info.message = "Erro ao buscar dados. Tente novamente!";
      return info;
    }

    if (response.status === 404) {
      info.message = messageNotFound;
      return info;
    }

    const responseJson = await response.json();
    const responsePage = responseJson.content;
    const totalPages = responseJson.totalPages;

    info = {
      ...info,
      message: "OK",
      success: true,
      data: responsePage,
      totalPages: totalPages,
    };

    return { ...info };
  }
}
