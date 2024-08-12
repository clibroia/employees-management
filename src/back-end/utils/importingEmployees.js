require("dotenv").config(); // Loading .env file contents into process.env
const { MongoClient } = require("mongodb"); // To connect to MongoDB
const path = require("path");
const fs = require("fs");

// MongoDB connection info
const url = `${process.env.MONGO_URL}`;
const dbName = "employeesManagement";
const collectionName = "employees";

// Reading the array of items and discarding the plaintexts passwords
const filename = path.join(__dirname, `./${process.env.DATA_SRC}`);
const data = JSON.parse(fs.readFileSync(filename, "utf-8")).employees;

// Connecting to the database
const initialSetup = async () => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Successfully connected to the database");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // The following lines determine if the initial setup already occurred
    const cursor = await collection.find({});
    const documents = await cursor.toArray();
    if (documents.length === 0) {
      const insertResult = await collection.insertMany(data);
      console.log(
        `Initial setup completed. Inserted documents: ${insertResult.insertedCount}`,
      );
    } else {
      console.log("The initial setup has already been done");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

initialSetup();
