import axios from "axios";

const API = axios.create({
  baseURL: "https://fitgenix-ai-platform-1.onrender.com/api"
});

/* Attach token automatically */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("flexaura_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;