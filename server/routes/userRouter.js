const express = require("express");
const {
  registerUser,
  getAllUsers,
  loginUser,
} = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
