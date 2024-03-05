const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  orgNo: {
    type: String,
  },
  text: {
    type: String,
  },
  message_type: {
    type: String,
    enum: ["sent", "received"],
  },
  message_date: {
    type: String,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
  },
  chat_id: {
    type: String,
  },
});

const TextModel = mongoose.model("text", textSchema);

module.exports = TextModel;
