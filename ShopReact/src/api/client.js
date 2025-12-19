import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true, 
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const detail = error.response.data?.detail;

      if (
        detail?.includes("token") ||
        detail?.includes("expired") ||
        detail?.includes("credentials") ||
        detail?.includes("Authentication")
      ) {
        localStorage.removeItem("user");
        alert("Сессия истекла или вы не вошли.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
    