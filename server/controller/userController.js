const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const existedUser = await userModel.findOne({ email: req.body.email });
    if (existedUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = new userModel(req.body);
    const response = await user.save();
    res.status(201).json({
      success: true,
      message: "registration successful, please login!",
      response: response._id,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || "User has entered invalid information",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existedUser = await userModel.findOne({ email });
    if (!existedUser) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist, please Signup",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(403).send("incorrect password");
    }
    res.clearCookie("auth_token", {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = jwt.sign(
      { userId: existedUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    res.status(201).json({
      success: true,
      message: "login successful",
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "User has entered invalid information",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
