const express = require("express");
const createSendTextController = require("../../controller/Text/createSendTextController");
const getAllTextController = require("../../controller/Text/getAllTextController");
const textRouter = express.Router();

textRouter.post("/send_text", createSendTextController);
textRouter.get("/get_text/:chatId", getAllTextController);

module.exports = textRouter;
