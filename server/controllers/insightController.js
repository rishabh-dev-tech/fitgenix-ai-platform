const { generateInsights } = require("../services/insightEngine");
const { success } = require("../utils/apiResponse");

exports.getInsights = async (req, res, next) => {
  try {
    const insights = await generateInsights(req.user._id);
    success(res, "Insights generated", insights);
  } catch (err) {
    next(err);
  }
};