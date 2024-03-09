const TextModel = require("../../models/clientText/text.schema");

const getAllTextController = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res
        .status(400)
        .json({ msg: "Requirements not fulfilled", status: false });
    }
    const allMsg = await TextModel.find({ chat_id: chatId });
    let newArr = allMsg.map((el, i) => ({
      text: el.text,
      status: el.message_type,
      date: el.message_date,
      client_id: el.client_id,
      chat_id: el.chat_id,
    }));
    return res.status(200).json({ data: newArr, status: true });
  } catch (err) {
    return res?.status(500).json({ msg: err.message, status: false });
  }
};

module.exports = getAllTextController;
