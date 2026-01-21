import api from "./axios";

/* Ask AI coach */
export const askCoach = (question) =>
  api.post("/ai/ask", { question });

/* Get AI history */
export const getMyAIHistory = () =>
  api.get("/ai/history");