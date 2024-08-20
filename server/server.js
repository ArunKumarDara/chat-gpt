const express = require("express");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("chat gpt clone !!!!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
