const express = require("express");
const userRouter = require("./userRouter");
const chatRouter = require("./chatsRouter");
const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.use("/chats", chatRouter);

module.exports = appRouter;
