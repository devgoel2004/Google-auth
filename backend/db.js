const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
