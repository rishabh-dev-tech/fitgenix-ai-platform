const AIInteraction = require("../models/AIInteraction");
const { askGemini } = require("../services/googleAIService");
const { success } = require("../utils/apiResponse");

/* =========================
   🤖 ASK AI COACH
========================= */
exports.askCoach = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required"
      });
    }

    // 🔥 REAL GOOGLE GEMINI RESPONSE
    const aiResponse = await askGemini(`
You are FitGenix-AISmart Coach 🤖 — an elite AI fitness trainer.

Rules:
- Keep answers under 150 words
- Use short paragraphs or bullet points
- Be motivating and practical
- Focus on fitness, nutrition, recovery, and mindset
- Do NOT write long essays
- Sound premium, modern, and supportive

Format every answer like this:

🔥 FitGenix-AI Smart Coach

• Clear main advice  
• 2–4 actionable tips  
• One motivational closing line

User question:
${question}
`);

    const interaction = await AIInteraction.create({
      user: req.user._id,
      question,
      response: aiResponse,
      context: "fitness"
    });

    success(res, "AI Coach response", interaction, 201);
  } catch (error) {
    // 🔴 FULL ERROR LOG (THIS IS WHAT YOU WANTED)
    console.log("🔥 AI ERROR FULL:");
    console.log(error.response?.data || error.message || error);

    next(error);
  }
};

/* =========================
   📜 USER AI HISTORY
========================= */
exports.getMyAIHistory = async (req, res, next) => {
  try {
    const history = await AIInteraction
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    success(res, "AI history fetched", history);
  } catch (error) {
    console.log("🔥 AI HISTORY ERROR:", error.message);
    next(error);
  }
};