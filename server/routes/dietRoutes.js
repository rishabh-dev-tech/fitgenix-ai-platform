const express = require("express");
const {
  addDiet,
  getMyDiets,
  getTodayDiet
} = require("../controllers/dietController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addDiet);
router.get("/", protect, getMyDiets);
router.get("/today", protect, getTodayDiet);

module.exports = router;