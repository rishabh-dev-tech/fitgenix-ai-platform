import api from "./axios";

export const getPrograms = () => {
  return api.get("/programs");
};

export const selectProgram = (programId) => {
  return api.post("/programs/select", { programId });
};