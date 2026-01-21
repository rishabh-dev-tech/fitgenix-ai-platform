const axios = require("axios");
const { GOOGLE_AI_KEY } = require("../config/env");

/* ✅ OFFICIAL WORKING MODEL FROM YOUR LIST */
const GEMINI_MODEL = "models/gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent`;

exports.askGemini = async (prompt) => {
  try {
    const res = await axios.post(
      `${GEMINI_URL}?key=${GOOGLE_AI_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.log("🔥 GOOGLE AI ERROR FULL:", error.response?.data || error.message);
    throw error;
  }
};