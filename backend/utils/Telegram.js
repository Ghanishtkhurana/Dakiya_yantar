const { default: axios } = require("axios");
const ClientModel = require("../models/client/client.schema");
const createClientController = require("../controller/Client/createClientController");
const TextModel = require("../models/clientText/text.schema");
const dayjs = require("dayjs");
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;

const postMessage = async ({ socket, body, chat_id, text }) => {
  const client_finder = await ClientModel.findOne({ chat_id: chat_id });
  if (!client_finder) {
    const create = await createClientController(body);
    console.log("hey");
    if (create) {
      console.log("if mein aya");
      const res = await axios.post(
        `${BASE_URL}/sendMessage?chat_id=${chat_id}&text=${"Welcome to the bot"}`
      );
    }
    socket.emit("client_added", create);
  } else {
    let chatId = client_finder.chat_id;
    const createText = await TextModel.create({
      text: body?.message?.text,
      message_type: "received",
      message_date: dayjs().format(),
      client_id: client_finder?._id,
      chat_id: chatId,
    });
    const updateClient = await ClientModel.findByIdAndUpdate(
      { _id: client_finder._id },
      {
        $push: { textArr: createText._id },
        lastSentMessage: body?.message?.text,
        lastSentMessageTime: dayjs().format(),
        latestMsgTime: dayjs().format(),
      },
      { new: true }
    );
    console.log("ipdaee",updateClient)
  }
};

const sendMessage = async ({ chat_id, text }) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/sendMessage?chat_id=${chat_id}&text=${text}`
    );
    console.log("message sent to", chat_id);
    return true;
  } catch (error) {
    console.log("err in send msg", error.message);
  }
};

module.exports = { postMessage, sendMessage };
