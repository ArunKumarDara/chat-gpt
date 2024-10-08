const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const appRouter = require("./routes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("chat gpt clone !!!!");
});

app.use("/app/v1", appRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
