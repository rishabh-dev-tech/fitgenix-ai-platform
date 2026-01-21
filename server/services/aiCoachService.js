const Progress = require("../models/Progress");
const WorkoutLog = require("../models/WorkoutLog");
const DietLog = require("../models/DietLog");

exports.generateCoachResponse = async (userId, question) => {
  const latestProgress = await Progress.findOne({ user: userId }).sort({ date: -1 });
  const latestWorkout = await WorkoutLog.findOne({ user: userId }).sort({ date: -1 });
  const latestDiet = await DietLog.findOne({ user: userId }).sort({ date: -1 });

  let response = "I’m your Flex Aura AI Coach. ";

  if (latestProgress?.weight && latestWorkout) {
    response += "You are consistent — great work. ";
  }

  if (latestWorkout && latestWorkout.totalDuration < 30) {
    response += "Try to increase your workout duration slightly for better results. ";
  }

  if (latestDiet && latestDiet.protein < 80) {
    response += "Your protein intake seems low. Consider adding more high-protein foods. ";
  }

  if (question.toLowerCase().includes("fat")) {
    response += "For fat loss, focus on calorie control, daily steps, and strength training.";
  } 
  else if (question.toLowerCase().includes("muscle")) {
    response += "For muscle growth, progressive overload, high protein, and quality sleep are key.";
  } 
  else if (question.toLowerCase().includes("motivation")) {
    response += "Consistency beats perfection. Even small workouts move you forward.";
  } 
  else {
    response += "Stay consistent with workouts, nutrition, and sleep. Progress is built daily.";
  }

  return response;
};