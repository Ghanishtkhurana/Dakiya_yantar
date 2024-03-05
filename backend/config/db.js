const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose.connect(process.env.MONGODB);
};

module.exports = connect;
