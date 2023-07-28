const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect with the database...
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      "Database connected successfully...",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
