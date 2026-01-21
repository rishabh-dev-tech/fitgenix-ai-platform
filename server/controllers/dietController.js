const DietLog = require("../models/DietLog");
const { success } = require("../utils/apiResponse");

/* ADD DIET LOG */
exports.addDiet = async (req, res, next) => {
  try {
    const diet = await DietLog.create({
      ...req.body,
      user: req.user._id
    });

    success(res, "Diet log added", diet, 201);
  } catch (error) {
    next(error);
  }
};

/* GET MY DIET LOGS */
exports.getMyDiets = async (req, res, next) => {
  try {
    const diets = await DietLog.find({ user: req.user._id }).sort({
      date: -1
    });

    success(res, "Diet history fetched", diets);
  } catch (error) {
    next(error);
  }
};

/* GET TODAY DIET */
exports.getTodayDiet = async (req, res, next) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const diet = await DietLog.findOne({
      user: req.user._id,
      date: { $gte: start, $lte: end }
    });

    success(res, "Today's diet fetched", diet);
  } catch (error) {
    next(error);
  }
}