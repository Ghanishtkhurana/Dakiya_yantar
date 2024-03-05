const express = require("express");
const clientRouter = require("./clients/router");
const textRouter = require("./text/router");
const allRouter = express.Router();

allRouter.get("/", (req, res) => {
  res.send("Hello telegram backend");
});

allRouter.use("/client", clientRouter);
allRouter.use("/text", textRouter);

module.exports = allRouter;
