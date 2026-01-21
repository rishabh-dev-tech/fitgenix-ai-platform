import api from "./axios";

export const getInsights = () =>
  api.get("/insights");