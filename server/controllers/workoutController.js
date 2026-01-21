const WorkoutLog = require("../models/WorkoutLog");
const { success } = require("../utils/apiResponse");

/* CREATE WORKOUT LOG */
exports.createWorkout = async (req, res, next) => {
  try {
    const workout = await WorkoutLog.create({
      ...req.body,
      user: req.user._id
    });

    success(res, "Workout logged successfully", workout, 201);
  } catch (error) {
    next(error);
  }
};

/* GET MY WORKOUTS */
exports.getMyWorkouts = async (req, res, next) => {
  try {
    const workouts = await WorkoutLog.find({ user: req.user._id }).sort({
      date: -1
    });

    success(res, "Workout history fetched", workouts);
  } catch (error) {
    next(error);
  }
};

/* GET SINGLE WORKOUT */
exports.getWorkoutById = async (req, res, next) => {
  try {
    const workout = await WorkoutLog.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found"
      });
    }

    success(res, "Workout fetched", workout);
  } catch (error) {
    next(error);
  }
};