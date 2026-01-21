const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getUserDetails,
  getPlatformStats,
  toggleAdminRole,
  toggleUserStatus,
  resetUserProgram,
  deleteUserCompletely,
  getAllWorkouts,
  getAllProgress,
  getAllDiets,
  getAllAI
} = require("../controllers/adminController");

const router = express.Router();

/* =======================
   📊 DASHBOARD
======================= */
router.get("/stats", protect, adminOnly, getPlatformStats);

/* =======================
   👥 USERS
======================= */
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/users/:id", protect, adminOnly, getUserDetails);

router.patch("/users/:id/role", protect, adminOnly, toggleAdminRole);
router.patch("/users/:id/status", protect, adminOnly, toggleUserStatus);
router.patch("/users/:id/reset-program", protect, adminOnly, resetUserProgram);
router.delete("/users/:id", protect, adminOnly, deleteUserCompletely);

/* =======================
   🧠 PLATFORM DATA
======================= */
router.get("/workouts", protect, adminOnly, getAllWorkouts);
router.get("/progress", protect, adminOnly, getAllProgress);
router.get("/diets", protect, adminOnly, getAllDiets);
router.get("/ai", protect, adminOnly, getAllAI);

module.exports = router;