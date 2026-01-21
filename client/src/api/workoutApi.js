import axios from "./axios";

export const createWorkout = (data) => {
  return axios.post("/workouts", data);
};

export const getMyWorkouts = () => {
  return axios.get("/workouts/my");
};