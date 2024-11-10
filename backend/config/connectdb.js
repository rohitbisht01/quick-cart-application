const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Database successfully connected to host: ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`Error connecting db`, error);
  }
};

module.exports = connectDb;
