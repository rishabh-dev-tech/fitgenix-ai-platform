const Program = require("../models/Program");
const User = require("../models/User");
const { success } = require("../utils/apiResponse");

/* CREATE PROGRAM (Admin / future use) */
exports.createProgram = async (req, res, next) => {
  try {
    const program = await Program.create({
      ...req.body,
      createdBy: req.user._id
    });

    success(res, "Program created successfully", program, 201);
  } catch (error) {
    next(error);
  }
};

/* GET ALL PROGRAMS */
exports.getPrograms = async (req, res, next) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    success(res, "Programs fetched", programs);
  } catch (error) {
    next(error);
  }
};

/* GET PROGRAMS BY GOAL */
exports.getProgramsByGoal = async (req, res, next) => {
  try {
    const programs = await Program.find({ goal: req.params.goal });
    success(res, "Programs fetched", programs);
  } catch (error) {
    next(error);
  }
};

/* GET SINGLE PROGRAM */
exports.getProgramById = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found"
      });
    }

    success(res, "Program fetched", program);
  } catch (error) {
    next(error);
  }
};

/* ✅ SELECT PROGRAM FOR USER */
exports.selectProgram = async (req, res, next) => {
  try {
    const { programId } = req.body;

    if (!programId) {
      return res.status(400).json({
        success: false,
        message: "Program ID is required"
      });
    }

    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found"
      });
    }

    const user = await User.findById(req.user.id);
    user.activeProgram = programId;
    await user.save();

    success(res, "Program activated successfully", program);
  } catch (error) {
    next(error);
  }
};