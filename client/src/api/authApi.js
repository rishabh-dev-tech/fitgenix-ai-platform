import api from "./axios";

export const registerUser = (formData) =>
  api.post("/auth/register", formData);

export const loginUser = (formData) =>
  api.post("/auth/login", formData);

export const getProfile = () =>
  api.get("/users/profile");