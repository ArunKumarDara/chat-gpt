const express = require("express");
const { registerUser, getAllUsers } = require("../controller/userController");
const userRouter = express.Router();

userRouter.get("/add", registerUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
