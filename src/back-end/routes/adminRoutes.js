require("dotenv").config();
const express = require("express");
const { matchedData } = require("express-validator");
const authenticateToken = require("../authentication/auth");
const {
  departmentCreateValidation,
  departmentUpdateValidation,
  employeeCreateValidation,
  employeeUpdateValidation,
} = require("../validation/modelsValidation");
const {
  checkIdParameterIssues,
  checkValidationErrors,
} = require("../validation/dataValidation");
const Department = require("./../models/department");
const Employee = require("./../models/employee");
const {
  anotherRecordExists,
  checkExistence,
  checkUniqueness,
  getEmployeesNumber,
  getNewId,
  insertRecord,
  updateRecord,
} = require("../utils/DBOperations");

const adminRouter = express.Router();

adminRouter.post(
  "/new-employee",
  authenticateToken,
  employeeCreateValidation,
  async (req, res, next) => {
    // Logger
    const logger = req.app.locals.logger;

    // Check validation errors
    const firstError = checkValidationErrors(req, logger);
    if (firstError) {
      return next(firstError);
    }

    // Sanitized inputs
    const data = matchedData(req);

    try {
      // Check if email or phone already exist
      const toCheck = { email: data.email, phone: data.phone };
      const uniquenessIssue = await checkUniqueness(toCheck, Employee, logger);
      if (uniquenessIssue) {
        return next(uniquenessIssue);
      }

      // Compute new id
      const newId = await getNewId(Employee, logger);

      // Assemble new employee
      const assembledData = {
        ...data,
        id: newId,
        password: "ChangeMe2024",
      };

      // Insert new employee
      insertRecord(assembledData, Employee, logger);
    } catch (err) {
      return next(err);
    }
    return res.status(201).json({ message: "Employee successfully created" });
  },
);

adminRouter.post(
  "/new-department",
  authenticateToken,
  departmentCreateValidation,
  async (req, res, next) => {
    // Logger
    const logger = req.app.locals.logger;

    // Check validation errors
    const firstError = checkValidationErrors(req, logger);
    if (firstError) {
      return next(firstError);
    }

    // Sanitized inputs
    const data = matchedData(req);

    try {
      const toCheck = { email: data.email, name: data.name, phone: data.phone };
      const uniquenessIssue = await checkUniqueness(
        toCheck,
        Department,
        logger,
      );
      if (uniquenessIssue) {
        return next(uniquenessIssue);
      }

      // Compute new id
      const newId = await getNewId(Department, logger);

      // Compute employeesNumber
      const employeesNumber = await getEmployeesNumber(data.name, logger);

      // Assemble new department
      const assembledData = {
        ...data,
        id: newId,
        employeesNumber,
      };

      // Insert new department
      insertRecord(assembledData, Department, logger);
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

    // Check validation errors
    const firstError = checkValidationErrors(req, logger);
    if (firstError) {
      return next(firstError);
    }

    // Validate id parameter
    const idParameterCheck = checkIdParameterIssues(
      req.params.id,
      "Employee",
      logger,
    );
    if (idParameterCheck[0] === 1) {
      return next(idParameterCheck[1]);
    }
    const referencedId = idParameterCheck[1];

    // Sanitized inputs
    const data = matchedData(req);
    if (!data.name) {
      data.name = {};
    }
    if (!data.department) {
      data.department = {};
    }

    try {
      // Check if an employee exists with an ID equal to id
      const checkExistenceResult = await checkExistence(
        { id: referencedId },
        Employee,
        logger,
      );
      if (checkExistenceResult[0] === 1) {
        return next(checkExistenceResult[1]);
      }
      const employee = checkExistenceResult[1];

      // Check if the provided email or phone already exist in the database
      const toCheck = { email: data.email, phone: data.phone };
      const anotherRecordIssue = await anotherRecordExists(
        toCheck,
        referencedId,
        Employee,
        logger,
      );
      if (anotherRecordIssue) {
        return next(anotherRecordIssue);
      }

      // Update employee
      const toUpdate = {
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
      };
      updateRecord(Employee, referencedId, toUpdate, logger);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json("Employee successfully updated");
  },
);

adminRouter.put(
  "/update-department/:id",
  authenticateToken,
  departmentUpdateValidation,
  async (req, res, next) => {
    // Logger
    const logger = req.app.locals.logger;

    // Check validation errors
    const firstError = checkValidationErrors(req, logger);
    if (firstError) {
      return next(firstError);
    }

    // Validate id parameter
    const idParameterCheck = checkIdParameterIssues(
      req.params.id,
      "Department",
      logger,
    );
    if (idParameterCheck[0] === 1) {
      return next(idParameterCheck[1]);
    }
    const referencedId = idParameterCheck[1];

    // Sanitized inputs
    const data = matchedData(req);

    try {
      // Check if a department exists with an ID equal to id
      const checkExistenceResult = await checkExistence(
        { id: referencedId },
        Department,
        logger,
      );
      if (checkExistenceResult[0] === 1) {
        return next(checkExistenceResult[1]);
      }
      const department = checkExistenceResult[1];

      // Check if the provided name, email or phone already exist in the database
      const toCheck = { name: data.name, email: data.email, phone: data.phone };
      const anotherRecordIssue = await anotherRecordExists(
        toCheck,
        referencedId,
        Department,
        logger,
      );
      if (anotherRecordIssue) {
        return next(anotherRecordIssue);
      }

      // Compute employeesNumber
      const employeesNumber = await getEmployeesNumber(data.name, logger);

      // Update department
      const toUpdate = {
        name: data.name || department.name,
        employeesNumber,
        budget: data.budget || department.budget,
        email: data.email || department.email,
        phone: data.phone || department.phone,
      };
      updateRecord(Department, referencedId, toUpdate, logger);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json("Department successfully updated");
  },
);

module.exports = adminRouter;
