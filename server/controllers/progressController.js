const Progress = require("../models/Progress");
const { success } = require("../utils/apiResponse");

/* ADD PROGRESS */
exports.addProgress = async (req, res, next) => {
  try {
    const progress = await Progress.create({
      ...req.body,
      user: req.user._id
    });

    success(res, "Progress added", progress, 201);
  } catch (error) {
    next(error);
  }
};

/* GET MY PROGRESS */
exports.getMyProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find({ user: req.user._id }).sort({
      date: 1
    });

    success(res, "Progress history fetched", progress);
  } catch (error) {
    next(error);
  }
};

/* GET LATEST PROGRESS */
exports.getLatestProgress = async (req, res, next) => {
  try {
    const progress = await Progress.findOne({ user: req.user._id }).sort({
      date: -1
    });

    success(res, "Latest progress fetched", progress);
  } catch (error) {
    next(error);
  }
};