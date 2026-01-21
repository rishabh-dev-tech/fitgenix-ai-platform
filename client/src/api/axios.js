import axios from "axios";

const api = axios.create({
  baseURL: "https://fitgenix-ai-platform-1.onrender.com/api",
});

/* Attach token automatically */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("flexaura_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;