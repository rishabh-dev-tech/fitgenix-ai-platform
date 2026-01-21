import api from "./axios";

export const getMe = () => {
  return api.get("/users/me");
};