const express = require("express");
const {
  createProgram,
  getPrograms,
  getProgramsByGoal,
  getProgramById,
  selectProgram
} = require("../controllers/programController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* Protected */
router.post("/", protect, createProgram);
router.post("/select", protect, selectProgram);

/* Public */
router.get("/", getPrograms);
router.get("/goal/:goal", getProgramsByGoal);
router.get("/:id", getProgramById);

module.exports = router;