const express = require("express");
const {
  addProgress,
  getMyProgress,
  getLatestProgress
} = require("../controllers/progressController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addProgress);
router.get("/", protect, getMyProgress);
router.get("/latest", protect, getLatestProgress);

module.exports = router;