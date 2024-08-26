require("winston-mongodb");
const winston = require("winston");
const { MongoClient } = require("mongodb");

const mongoUri = `${process.env.MONGO_URI}`;

let logger = null;

const getLogger = () => {
  if (!logger) {
    throw new Error("Logger has not been initialized yet");
  }
  return logger;
};

const initializeLogger = async () => {
  try {
    // MongoDB connection
    const client = new MongoClient(mongoUri);
    await client.connect();

    // Logger creation
    const logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({
          db: await Promise.resolve(client),
          collection: "logs",
        }),
      ],
    });

    return logger;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw new Error(
      "[SERVER ERROR] Error establishing MongoDB connection for logging",
    );
  }
};

const setLogger = (initializedLogger) => {
  logger = initializedLogger;
};

module.exports = { getLogger, initializeLogger, setLogger };
