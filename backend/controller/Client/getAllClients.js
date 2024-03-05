const dayjs = require("dayjs");
const ClientModel = require("../../models/client/client.schema");

const getAllClient = async (req, res) => {
  try {
    let pipeline = [
      // {
      //   $match: {
      //     lte: dayjs().format(),
      //   },
      // },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          username: 1,
          chat_id: 1,
          lastRecievedMessage: 1,
          lastRecievedMessageTime: 1,
          createdAt: 1,
          updatedAt: 1,
          lastSentMessage: 1,
          lastSentMessageTime: 1,
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ];
    const clients = await ClientModel.aggregate(pipeline);
    // const clients = await ClientModel.find({});
    return res.status(200).send({ data: clients, status: true });
  } catch (error) {
    return res?.status(400).send({ message: error.message, status: false });
  }
};

module.exports = getAllClient;
