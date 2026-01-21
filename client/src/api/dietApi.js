import api from "./axios";

/* ADD DIET LOG */
export const addDiet = (data) =>
  api.post("/diet", data);

/* GET ALL MY DIET LOGS */
export const getMyDiets = () =>
  api.get("/diet");

/* GET TODAY DIET */
export const getTodayDiet = () =>
  api.get("/diet/today");