const Progress = require("../models/Progress");
const WorkoutLog = require("../models/WorkoutLog");
const DietLog = require("../models/DietLog");
const Program = require("../models/Program");
const AIInteraction = require("../models/AIInteraction");
const { success } = require("../utils/apiResponse");

exports.getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const latestProgress = await Progress.findOne({ user: userId }).sort({ date: -1 });

    const recentWorkouts = await WorkoutLog.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayDiet = await DietLog.findOne({
      user: userId,
      date: { $gte: todayStart, $lte: todayEnd }
    });

    const totalPrograms = await Program.countDocuments();

    const aiCount = await AIInteraction.countDocuments({ user: userId });

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyWorkoutCount = await WorkoutLog.countDocuments({
      user: userId,
      date: { $gte: weekAgo }
    });

    success(res, "Dashboard data fetched", {
      latestProgress,
      recentWorkouts,
      todayDiet,
      totalPrograms,
      aiCount,
      weeklyWorkoutCount
    });
  } catch (error) {
    next(error);
  }
};