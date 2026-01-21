import axios from "axios";

const API = axios.create({
  baseURL: "https://fitgenix-ai-platform-1.onrender.com"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("flexaura_token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getInsights = () => API.get("/insights");