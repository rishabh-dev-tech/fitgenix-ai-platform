const WorkoutLog = require("../models/WorkoutLog");
const DietLog = require("../models/DietLog");
const Progress = require("../models/Progress");
const Program = require("../models/Program");

exports.generateInsights = async (userId) => {
  const workouts = await WorkoutLog.find({ user: userId });
  const diets = await DietLog.find({ user: userId }).sort({ date: -1 }).limit(7);
  const progress = await Progress.find({ user: userId }).sort({ date: -1 }).limit(5);

  const insights = [];

  /* WORKOUT CONSISTENCY */
  if (workouts.length === 0) {
    insights.push("You haven’t logged any workouts yet. Start training to activate progress tracking.");
  } else if (workouts.length < 3) {
    insights.push("Your workout frequency is low. Try training at least 3 times per week.");
  } else {
    insights.push("Great job staying consistent with your workouts.");
  }

  /* DIET CHECK */
  if (diets.length > 0) {
    const avgProtein = diets.reduce((a, d) => a + d.protein, 0) / diets.length;
    if (avgProtein < 60) insights.push("Your protein intake seems low. Increase protein to support recovery.");
    else insights.push("Your protein intake looks good. Keep it up.");
  }

  /* PROGRESS TREND */
  if (progress.length >= 2) {
    const diff = progress[0].weight - progress[progress.length - 1].weight;
    if (diff > 1) insights.push("Your weight is increasing. Ensure this aligns with your fitness goal.");
    if (diff < -1) insights.push("Your weight is dropping. Stay consistent and monitor strength.");
    if (Math.abs(diff) < 0.5) insights.push("Your weight is stable. Adjust training or nutrition if needed.");
  }

  return insights;
};