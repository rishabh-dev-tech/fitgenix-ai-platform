const express = require("express");
const {
  createWorkout,
  getMyWorkouts,
  getWorkoutById
} = require("../controllers/workoutController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* Create workout */
router.post("/", protect, createWorkout);

/* Get logged-in user's workouts */
router.get("/my", protect, getMyWorkouts);

/* Get single workout */
router.get("/:id", protect, getWorkoutById);

module.exports = router;