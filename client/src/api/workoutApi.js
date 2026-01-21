import api from "./axios";

export const createWorkout = (data) => {
  return api.post("/workouts", data);
};

export const getMyWorkouts = () => {
  return api.get("/workouts/my");
};