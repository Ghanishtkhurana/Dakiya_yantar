const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    orgNo: {
      type: String,
    },
    username: {
      type: String,
    },
    chat_id: {
      type: String,
      required: true,
    },
    textArr: {
      type: Array,
    },
    lastSentMessage: {
      type: String,
    },
    lastSentMessageTime: {
      type: String,
    },
    lastRecievedMessage: {
      type: String,
    },
    lastRecievedMessageTime: {
      type: String,
    },
    latestMsgTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("client", clientSchema);

module.exports = ClientModel;
