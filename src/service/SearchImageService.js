export class SearchImageService {
  constructor() {
    this.clientID = import.meta.env.VITE_PEXELS_CLIENT_ID;
    this.baseUrl = import.meta.env.VITE_PEXELS_URL;
  }

  async searchImages(imageName, currentPage) {
    const apiImageUrl = `${this.baseUrl}?query=${imageName}&per_page=40&page=${currentPage}&locale=pt-BR`;
    try {
      const response = await fetch(apiImageUrl, {
        headers: {
          Authorization: this.clientID,
        },
      });
      if (!response.ok) {
        throw new Error("Erro na requisição da API");
      }
      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
