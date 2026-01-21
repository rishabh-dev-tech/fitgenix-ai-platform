const express = require("express");
const { askCoach, getMyAIHistory } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/ask", protect, askCoach);
router.get("/history", protect, getMyAIHistory);

module.exports = router;