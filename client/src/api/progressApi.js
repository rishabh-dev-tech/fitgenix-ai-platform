import api from "./axios";

/* ADD PROGRESS */
export const addProgress = (data) =>
  api.post("/progress", data);

/* GET ALL MY PROGRESS */
export const getMyProgress = () =>
  api.get("/progress");

/* GET LATEST PROGRESS */
export const getLatestProgress = () =>
  api.get("/progress/latest");