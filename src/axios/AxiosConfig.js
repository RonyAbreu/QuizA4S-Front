import axios from "axios";

export const apiAxios = axios.create({
    baseURL: "https://quizapp.a4s.dev.br/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
})

apiAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
