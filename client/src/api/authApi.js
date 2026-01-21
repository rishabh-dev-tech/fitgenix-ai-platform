import API from "./api";

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getProfile = () => API.get("/users/profile");