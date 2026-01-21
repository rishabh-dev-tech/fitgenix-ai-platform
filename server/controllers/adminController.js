const User = require("../models/User");
const WorkoutLog = require("../models/WorkoutLog");
const Progress = require("../models/Progress");
const DietLog = require("../models/DietLog");
const AIInteraction = require("../models/AIInteraction");
const { success } = require("../utils/apiResponse");

/* =========================
   📊 BASIC ADMIN VIEWS
========================= */

/* GET ALL USERS */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    success(res, "Users fetched", users);
  } catch (error) {
    next(error);
  }
};

/* GET FULL USER DETAILS */
exports.getUserDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const workouts = await WorkoutLog.find({ user: userId }).sort({ date: -1 });
    const progress = await Progress.find({ user: userId }).sort({ date: -1 });
    const diets = await DietLog.find({ user: userId }).sort({ date: -1 });
    const ai = await AIInteraction.find({ user: userId }).sort({ createdAt: -1 });

    success(res, "User details fetched", {
      user,
      workouts,
      progress,
      diets,
      ai
    });
  } catch (error) {
    next(error);
  }
};

/* PLATFORM STATS */
exports.getPlatformStats = async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const workouts = await WorkoutLog.countDocuments();
    const progress = await Progress.countDocuments();
    const diets = await DietLog.countDocuments();
    const ai = await AIInteraction.countDocuments();

    success(res, "Platform stats fetched", {
      users,
      workouts,
      progress,
      diets,
      ai
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   🔥 ADMIN ACTIONS
========================= */

exports.toggleAdminRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    success(res, "User role updated", { id: user._id, role: user.role });
  } catch (error) {
    next(error);
  }
};

exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.isActive = user.isActive === false ? true : false;
    await user.save();

    success(res, "User status updated", { id: user._id, isActive: user.isActive });
  } catch (error) {
    next(error);
  }
};

exports.resetUserProgram = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.activeProgram = null;
    await user.save();

    success(res, "User program reset");
  } catch (error) {
    next(error);
  }
};

exports.deleteUserCompletely = async (req, res, next) => {
  try {
    const userId = req.params.id;

    await Promise.all([
      WorkoutLog.deleteMany({ user: userId }),
      Progress.deleteMany({ user: userId }),
      DietLog.deleteMany({ user: userId }),
      AIInteraction.deleteMany({ user: userId }),
      User.findByIdAndDelete(userId)
    ]);

    success(res, "User and all related data deleted");
  } catch (error) {
    next(error);
  }
};

/* =========================
   🧠 ADMIN DATA VIEWS
========================= */

exports.getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await WorkoutLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    success(res, "All workouts fetched", workouts);
  } catch (error) {
    next(error);
  }
};

exports.getAllProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    success(res, "All progress logs fetched", progress);
  } catch (error) {
    next(error);
  }
};

exports.getAllDiets = async (req, res, next) => {
  try {
    const diets = await DietLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    success(res, "All diet logs fetched", diets);
  } catch (error) {
    next(error);
  }
};

exports.getAllAI = async (req, res, next) => {
  try {
    const ai = await AIInteraction.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    success(res, "All AI interactions fetched", ai);
  } catch (error) {
    next(error);
  }
};