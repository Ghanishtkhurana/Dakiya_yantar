const TextModel = require("../../models/clientText/text.schema");
const dayjs = require("dayjs");
const ClientModel = require("../../models/client/client.schema");
const { sendMessage } = require("../../utils/Telegram");

const createSendTextController = async (req, res) => {
  try {
    const { text, chat_id, id } = req.body;
    if (!text && !chat_id && !id) {
      return res
        .status(400)
        .json({ msg: "Please provide all the required fields", status: false });
    }
    console.log("body", req.body);
    const createText = await TextModel.create({
      text: text,
      message_type: "sent",
      message_date: dayjs().format(),
      client_id: id,
      chat_id: chat_id,
    });
    const updateClient = await ClientModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: { textArr: createText._id },
        lastSentMessage: text,
        lastSentMessageTime: dayjs().format(),
        latestMsgTime: dayjs().format(),
      },
      { new: true }
    );
    // bot.sendMessage(chatId, text);
    await sendMessage({ chat_id: chat_id, text: text });
    return res
      .status(200)
      .send({ message: "Text sent successfully", status: "success" });
  } catch (error) {
    return res?.status(500).json({ msg: error.message, status: false });
  }
};

module.exports = createSendTextController;
