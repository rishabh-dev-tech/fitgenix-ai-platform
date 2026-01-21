const User = require("../models/User");
const bcrypt = require("bcryptjs");

const isStrongPassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasLength = password.length >= 8;

  return hasUppercase && hasNumber && hasSpecial && hasLength;
};
/* REGISTER USER */
exports.registerUser = async (name, email, password) => {

  if (!isStrongPassword(password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one number, and one special character"
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  return await User.create({
    name,
    email,
    password: hashed
  });
};

/* LOGIN USER */
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};