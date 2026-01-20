const { configDotenv } = require("dotenv");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
configDotenv();
async function registercontroller(req, res) {
  const { username, password } = req.body;
  const userExist = await userModel.findOne({ username });
  if (userExist) {
    return res.status(400).json({
      massage: "user already exist",
    });
  }
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(201).json({
    massage: "user created successfully",
  });
}

async function logincontroller(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).json({
      massage: "user not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      massage: "invalid password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(200).json({
    massage: "user logged in successfully",
    user,
  });
}
module.exports = {
  registercontroller,
  logincontroller,
};
