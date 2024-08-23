const mongoose = require("mongoose");

const connectToDB = async (mongooseUri, logger) => {
  try {
    await mongoose.connect(mongooseUri);
  } catch (err) {
    logger.error(
      `[SERVER ERROR] Error establishing Mongoose connection: ${err}`,
    );
    throw new Error();
  }
};

module.exports = connectToDB;
