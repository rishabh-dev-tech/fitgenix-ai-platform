const authService = require("../services/authService");
const generateToken = require("../utils/generateToken");
const { success } = require("../utils/apiResponse");

/* REGISTER */
exports.register = async (req, res, next) => {
  try {
    console.log("REGISTER API HIT");
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    console.log("USER CREATED");

    success(res, "User registered successfully", {
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, 201);
  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    next(err);
  }
};

/* LOGIN */
exports.login = async (req, res, next) => {
  try {
    console.log("LOGIN API HIT");

    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    console.log("LOGIN SUCCESS");

    success(res, "Login successful", {
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    next(err);
  }
};