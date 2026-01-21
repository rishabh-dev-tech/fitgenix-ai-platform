import api from "./axios";

/* =====================
   📊 DASHBOARD
===================== */
export const getPlatformStats = () => api.get("/admin/stats");

/* =====================
   👥 USERS
===================== */
export const getAllUsers = () => api.get("/admin/users");
export const getUserDetails = (id) => api.get(`/admin/users/${id}`);

/* =====================
   🔥 ADMIN ACTIONS
===================== */
export const toggleUserRole = (id) =>
  api.patch(`/admin/users/${id}/role`);

export const toggleUserStatus = (id) =>
  api.patch(`/admin/users/${id}/status`);

export const resetUserProgram = (id) =>
  api.patch(`/admin/users/${id}/reset-program`);

export const deleteUser = (id) =>
  api.delete(`/admin/users/${id}`);

/* =====================
   🧠 ADMIN DATA VIEWS
===================== */
export const getAllAdminWorkouts = () => api.get("/admin/workouts");
export const getAllProgress = () => api.get("/admin/progress");
export const getAllAdminDiets = () => api.get("/admin/diets");
export const getAllAdminAI = () => api.get("/admin/ai");