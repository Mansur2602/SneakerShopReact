import axios from "axios";

const defaultOrigin = `${window.location.protocol}//${window.location.hostname}:8000`;
const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? defaultOrigin;

const apiClient = axios.create({
  baseURL: `${apiOrigin.replace(/\/$/, "")}/api/`,
  withCredentials: true,
});

export default apiClient;

