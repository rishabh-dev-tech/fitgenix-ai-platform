import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

/* Attach token automatically */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("flexaura_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ADD PROGRESS */
export const addProgress = (data) => API.post("/progress", data);

/* GET ALL MY PROGRESS */
export const getMyProgress = () => API.get("/progress");

/* GET LATEST PROGRESS */
export const getLatestProgress = () => API.get("/progress/latest");