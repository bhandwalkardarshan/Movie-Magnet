const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  await mongoose.connect(process.env.MongoURL);
  console.log("Connected to Mongo Database");
};

module.exports = connection