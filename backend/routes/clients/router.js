const express = require("express");
const getAllClient = require("../../controller/Client/getAllClients");
const clientRouter = express.Router();

clientRouter.get("/all", getAllClient);

module.exports = clientRouter;
