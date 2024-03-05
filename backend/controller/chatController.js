const chatController = async (msg) => {
  try {
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = chatController;
