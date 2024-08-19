require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { validationResult, matchedData } = require("express-validator");
const authenticateToken = require("../authentication/auth");
const {
  departmentValidation,
  employeeCreateValidation,
  employeeUpdateValidation,
} = require("../validation/modelsValidation");
const Department = require("./../models/department");
const Employee = require("./../models/employee");

const adminRouter = express.Router();

adminRouter.post(
  "/new-employee",
  authenticateToken,
  employeeCreateValidation,
  async (req, res, next) => {
    // Logger
    const logger = req.app.locals.logger;

    // Mongoose URI
    const mongooseUri = `${process.env.MONGOOSE_URI}`;

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

      // Check if email or phone already exist
      const emailTest = await Employee.findOne({ email: data.email });
      const phoneTest = await Employee.findOne({ phone: data.phone });
      if (emailTest || phoneTest) {
        logger.warn(
          "[RESOURCE CONFLICT] Attempted to duplicate employee's email or phone",
        );
        return next({
          msg: "[RESOURCE CONFLICT] Employee's email or phone already in use",
        });
      }

      // Compute new id
      let lastId;
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
          lastId = result[0] ? result[0].maxId : 1000;
        })
        .catch(() => {
          logger.error("[SERVER ERROR] Error executing aggregate query");
          throw new Error();
        });

      // Assemble new employee
      const assembledData = {
        ...data,
        id: lastId + 1,
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

      // Close DB connection
      await mongoose.connection.close();
    } catch (err) {
      return next(err);
    }
    return res.status(201).json({ message: "Employee successfully created" });
  },
);

adminRouter.post(
  "/new-department",
  authenticateToken,
  departmentValidation,
  async (req, res, next) => {
    // Logger
    const logger = req.app.locals.logger;

    // Mongoose URI
    const mongooseUri = `${process.env.MONGOOSE_URI}`;

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

      // Check if email, name or phone already exist
      const emailTest = await Department.findOne({ email: data.email });
      const nameTest = await Department.findOne({ name: data.name });
      const phoneTest = await Department.findOne({ phone: data.phone });
      if (emailTest || nameTest || phoneTest) {
        logger.warn(
          "[RESOURCE CONFLICT] Attempted to duplicate department's email, name or phone",
        );
        return next({
          msg: "[RESOURCE CONFLICT] Department's email, name or phone already in use",
        });
      }

      // Compute new id
      let lastId;
      await Department.aggregate([
        {
          $group: {
            _id: null,
            maxId: { $max: "$id" },
          },
        },
      ])
        .exec()
        .then((result) => {
          lastId = result[0] ? result[0].maxId : 0;
        })
        .catch(() => {
          logger.error("[SERVER ERROR] Error executing aggregate query");
          throw new Error();
        });

      // Compute employeesNumber
      let employeesNumber;
      await Employee.aggregate([
        {
          $match: { "department.name": data.name },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
        .exec()
        .then((result) => {
          if (!result[0]) {
            employeesNumber = 0;
          } else {
            employeesNumber = result[0].count;
          }
        })
        .catch(() => {
          logger.error("[SERVER ERROR] Error executing aggregate query");
          throw new Error();
        });

      // Assemble new department
      const assembledData = {
        ...data,
        id: lastId + 1,
        employeesNumber,
      };

      // Insert new department
      const newDepartment = new Department(assembledData);
      const savedNewDepartment = await newDepartment.save();
      if (!savedNewDepartment) {
        logger.error("[SERVER ERROR] Error inserting a new department");
        throw new Error();
      }

      // Log
      logger.info(
        `[ADMIN ACTION] Department Created with departmentId ${savedNewDepartment.id}`,
      );

      // Close DB connection
      await mongoose.connection.close();
    } catch (err) {
      return next(err);
    }
    return res.status(201).json({ message: "Department successfully created" });
  },
);

adminRouter.put(
  "/update-employee/:id",
  authenticateToken,
  employeeUpdateValidation,
  async (req, res, next) => {
    // Logger
    const logger = req.app.locals.logger;

    // Mongoose URI
    const mongooseUri = `${process.env.MONGOOSE_URI}`;

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array({ onlyFirstError: true })[0];
      logger.warn(firstError.msg);
      return next(firstError);
    }

    // Validate id parameter
    if (!req.params.id.match(/^[1-9]\d{3,}$/)) {
      logger.warn(
        "[PARAMETER ERROR] Wrong structure for the provided id parameter",
      );
      return next({ msg: "[PARAMETER ERROR] Invalid id parameter" });
    }
    const referencedId = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(referencedId)) {
      logger.warn("[PARAMETER ERROR] A non-integer id parameter was provided");
      return next({ msg: "[PARAMETER ERROR] Invalid id parameter" });
    }
    if (referencedId < 1001) {
      logger.warn(
        "[PARAMETER ERROR] An id parameter below the minimum was provided",
      );
      return next({ msg: "[PARAMETER ERROR] Invalid id parameter" });
    }

    // Sanitized inputs
    const data = matchedData(req);
    if (!data.name) {
      data.name = {};
    }
    if (!data.department) {
      data.department = {};
    }

    try {
      // Connect to MongoDB with Mongoose
      await mongoose.connect(mongooseUri);
      if (!mongoose.connection.db) {
        logger.error("[SERVER ERROR] Error establishing Mongoose connection");
        throw new Error();
      }
      // Check if an employee exists with an ID equal to id
      const employee = await Employee.findOne({ id: referencedId });
      if (!employee) {
        logger.warn("[NOT FOUND] Referenced employee not in the database");
        const error = new Error();
        error.msg = "[NOT FOUND] Resource not found";
        throw error;
      }

      // Check if an employee exists with email equal to data.email, if provided
      if (data.email) {
        const emailTest = await Employee.findOne({
          email: data.email,
          id: { $ne: referencedId },
        });
        if (emailTest) {
          logger.warn(
            "[RESOURCE CONFLICT] Attempted to update an employee's email to one already in use",
          );
          const error = new Error();
          error.msg =
            "[RESOURCE CONFLICT] Employee's email or phone already in use";
          throw error;
        }
      }

      // Check if an employee exists with phone number equal to data.phone, if provided
      if (data.phone) {
        const phoneTest = await Employee.findOne({
          phone: data.phone,
          id: { $ne: referencedId },
        });
        if (phoneTest) {
          logger.warn(
            "[RESOURCE CONFLICT] Attempted to update an employee's phone number to one already in use",
          );
          const error = new Error();
          error.msg =
            "[RESOURCE CONFLICT] Employee's email or phone already in use";
          throw error;
        }
      }

      // Update employee
      const result = await Employee.updateOne(
        {
          id: referencedId,
        },
        {
          $set: {
            "name.firstName": data.name.firstName || employee.name.firstName,
            "name.middleName": data.name.middleName || employee.name.middleName,
            "name.lastName": data.name.lastName || employee.name.lastName,
            "department.name": data.department.name || employee.department.name,
            "department.head": data.department.head || employee.department.head,
            role: data.role || employee.role,
            hiredOn: data.hiredOn || employee.hiredOn,
            email: data.email || employee.email,
            phone: data.phone || employee.phone,
            password: data.password || employee.password,
          },
        },
      );

      if (result.matchedCount !== 1) {
        logger.error("[SERVER ERROR] Error updating an employee record");
        throw new Error();
      }

      // Log
      logger.info(`[ADMIN ACTION] Updated employee with id: ${employee.id}`);

      // Close DB connection
      await mongoose.connection.close();
    } catch (err) {
      return next(err);
    }
    return res.status(200).json("Employee successfully updated");
  },
);

module.exports = adminRouter;
