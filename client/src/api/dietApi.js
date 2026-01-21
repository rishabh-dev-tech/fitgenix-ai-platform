import axios from "axios";

const API = axios.create({
  baseURL: "https://fitgenix-ai-platform-1.onrender.com"
});

/* Attach token automatically */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("flexaura_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ADD DIET LOG */
export const addDiet = (data) => API.post("/diet", data);

/* GET ALL MY DIET LOGS */
export const getMyDiets = () => API.get("/diet");

/* GET TODAY DIET */
export const getTodayDiet = () => API.get("/diet/today");