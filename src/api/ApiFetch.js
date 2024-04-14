import { URL_BASE } from "../App";

export class ApiFetch {
  constructor() {}

  async delete(basePath, isRemoveUser) {
    let info = {
        message: "",
        removed: false,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      info.message = "Token inválido";
      return info;
    }

    const response = await fetch(`${URL_BASE}${basePath}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        info.message = "Erro do servidor";
        return info;
    }

    if(isRemoveUser){
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        window.location.href = "/login";
    }

    info = {...info, message: "OK", removed: true};

    return {...info};
  }

  async patch(basePath, data) {
    let info = {
        message: "",
        success: false,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      info.message = "Token inválido";
      return info;
    }

    const response = await fetch(`${URL_BASE}${basePath}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if(!response.ok){
        info.message = "Erro ao atualizar. Tente novamente!";
        return info;
    }

    info = {...info, message: "OK", success: true};

    return {...info};
  }
}
