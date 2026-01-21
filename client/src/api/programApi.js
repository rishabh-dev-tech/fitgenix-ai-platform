import axios from "./axios";

export const getPrograms = () => {
  return axios.get("/programs");
};

export const selectProgram = (programId) => {
  return axios.post("/programs/select", { programId });
};