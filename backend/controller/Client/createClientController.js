const ClientModel = require("../../models/client/client.schema");
const dayjs = require("dayjs");
const TextModel = require("../../models/clientText/text.schema");

const createClientController = async (body) => {
  try {
    console.log("create body", body);
    const newClient = new ClientModel({
      chat_id: body?.message?.chat?.id,
      first_name: body?.message?.from?.first_name,
      last_name: body?.message?.from?.last_name,
      username: body?.message?.from?.username,
      lastRecievedMessage: body?.message?.text,
      lastRecievedMessageTime: dayjs().format(),
    });

    const createText = await TextModel.create({
      text: body?.message?.text,
      message_type: "received",
      message_date: newClient?.lastRecievedMessageTime,
      client_id: newClient?._id,
      chat_id: body?.message?.chat?.id,
    });

    await newClient.textArr.push(createText._id);
    await newClient.save();
    await createText.save();
    // console.log("new client", newClient);
    return newClient;
  } catch (error) {
    return false;
  }
};

module.exports = createClientController;
