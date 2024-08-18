require("dotenv").config();
require("winston-mongodb");
const winston = require("winston");
const mongoose = require("mongoose");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const { validationResult, matchedData } = require("express-validator");
const authenticateToken = require("../authentication/auth");
const { employeeValidation } = require("../validation/validate");
const Employee = require("./../models/employee");
const logger = require("./../utils/logger");

const adminRouter = express.Router();

adminRouter.post(
  "/new-employee",
  authenticateToken,
  employeeValidation,
  async (req, res, next) => {
    // Mongo DB variables
    const mongooseUri = `${process.env.MONGOOSE_URI}`;
    const mongoUri = `${process.env.MONGO_URI}`;

    // Log client for MongoDB
    const client = new MongoClient(mongoUri);
    await client.connect();
    const transportOptions = {
      db: await Promise.resolve(client),
      collection: "logs",
    };
    logger.add(new winston.transports.MongoDB(transportOptions));

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array({ onlyFirstError: true })[0];
      logger.warn(firstError.msg);
      return next(firstError);
    }

    // Sanitized inputs
    const data = matchedData(req);

    try {
      // Connect to MongoDB with Mongoose
      await mongoose.connect(mongooseUri);
      if (!mongoose.connection.db) {
        logger.error("[SERVER ERROR] Error establishing Mongoose connection");
        throw new Error();
      }

      // Check if email and phone already exist
      const emailTest = await Employee.findOne({ email: data.email });
      const phoneTest = await Employee.findOne({ phone: data.phone });
      if (emailTest || phoneTest) {
        logger.warn(
          "[RESOURCE CONFLICT] Tried to insert duplicate email or phone",
        );
        return next({
          msg: "[RESOURCE CONFLICT] Email or phone already present",
        });
      }

      // Compute new id
      let newId;
      await Employee.aggregate([
        {
          $group: {
            _id: null,
            maxId: { $max: "$id" },
          },
        },
      ])
        .exec()
        .then((result) => {
          newId = 1 + result[0] ? result[0].maxId : 1000;
        })
        .catch(() => {
          logger.error("[SERVER ERROR] Error executing aggregate query");
          throw new Error();
        });

      // Assemble new employee
      const assembledData = {
        ...data,
        id: newId + 1,
        password: "ChangeMe2024",
      };

      // Insert new employee
      const newEmployee = new Employee(assembledData);
      const savedNewEmployee = await newEmployee.save();
      if (!savedNewEmployee) {
        logger.error("[SERVER ERROR] Error inserting a new employee");
        throw new Error();
      }

      // Log
      logger.info(
        `[ADMIN ACTION] Employee Created with employeeId ${savedNewEmployee.id}`,
      );

      // Close DB connections
      await mongoose.connection.close();
      await client.close();
    } catch (err) {
      return next(err);
    }
    return res.status(201).json({ message: "Employee successfully created" });
  },
);

module.exports = adminRouter;
