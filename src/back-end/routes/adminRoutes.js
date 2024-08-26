require("dotenv").config();
const { getLogger } = require("../utils/logger");
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
  checkValidationErrors,
  validateIdParameter,
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
const logger = getLogger();

adminRouter.get(
  "/get-employee/:id",
  authenticateToken,
  validateIdParameter,
  async (req, res, next) => {
    const idParameter = Number.parseInt(req.params.id, 10);
    let employee;

    try {
      // Check if an employee exists with an ID equal to id
      const checkExistenceResult = await checkExistence(
        { id: idParameter },
        Employee,
        logger,
      );
      if (checkExistenceResult[0] === 1) {
        return next(checkExistenceResult[1]);
      }
      employee = checkExistenceResult[1];

      logger.info(
        `[ADMIN ACTION] Requested data from employee with id: ${employee.id}`,
      );
    } catch (err) {
      return next(err);
    }
    /* eslint-disable-next-line no-unused-vars */
    const { _id, __v, password, ...response } = employee.toObject();
    /* eslint-enable-next-line no-unused-vars */
    return res.status(200).json(response);
  },
);

adminRouter.get(
  "/get-department/:id",
  authenticateToken,
  validateIdParameter,
  async (req, res, next) => {
    const idParameter = Number.parseInt(req.params.id, 10);
    let department;

    try {
      // Check if a department exists with an ID equal to id
      const checkExistenceResult = await checkExistence(
        { id: idParameter },
        Department,
        logger,
      );
      if (checkExistenceResult[0] === 1) {
        return next(checkExistenceResult[1]);
      }
      department = checkExistenceResult[1];

      // Compute employeesNumber
      const employeesNumber = await getEmployeesNumber(department.name, logger);

      if (employeesNumber !== department.employeesNumber) {
        // Update department
        const toUpdate = { employeesNumber };
        updateRecord(Department, idParameter, toUpdate, logger);
        department.employeesNumber = employeesNumber;
      }

      logger.info(
        `[ADMIN ACTION] Requested data from department with id: ${department.id}`,
      );
    } catch (err) {
      return next(err);
    }
    /* eslint-disable-next-line no-unused-vars */
    const { _id, __v, ...response } = department.toObject();
    /* eslint-enable-next-line no-unused-vars */
    return res.status(200).json(response);
  },
);

adminRouter.post(
  "/new-employee",
  authenticateToken,
  employeeCreateValidation,
  async (req, res, next) => {
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
    // Check validation errors
    const firstError = checkValidationErrors(req, logger);
    if (firstError) {
      return next(firstError);
    }

    // Sanitized inputs
    const data = matchedData(req);

    try {
      // Check if email, name or phone already exist
      const toCheck = { email: data.email, name: data.name, phone: data.phone };
      const uniquenessIssue = await checkUniqueness(
        toCheck,
        Department,
        logger,
      );
      if (uniquenessIssue) {
        return next(uniquenessIssue);
      }

      if (data.head) {
        // Check if an employee exists with id equal to head
        const query = { id: data.head };
        const checkExistenceResult = await checkExistence(
          query,
          Employee,
          logger,
        );
        if (checkExistenceResult[0] === 1) {
          return next(checkExistenceResult[1]);
        }
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
  validateIdParameter,
  employeeUpdateValidation,
  async (req, res, next) => {
    const idParameter = Number.parseInt(req.params.id, 10);

    // Check validation errors
    const firstError = checkValidationErrors(req, logger);
    if (firstError) {
      return next(firstError);
    }

    // Sanitized inputs
    const data = matchedData(req);
    if (!data.name) {
      data.name = {};
    }

    try {
      // Check if an employee exists with an ID equal to id
      const checkExistenceResult = await checkExistence(
        { id: idParameter },
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
        idParameter,
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
        department: data.department || employee.department,
        role: data.role || employee.role,
        hiredOn: data.hiredOn || employee.hiredOn,
        email: data.email || employee.email,
        phone: data.phone || employee.phone,
        password: data.password || employee.password,
      };
      updateRecord(Employee, idParameter, toUpdate, logger);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json("Employee successfully updated");
  },
);

adminRouter.put(
  "/update-department/:id",
  authenticateToken,
  validateIdParameter,
  departmentUpdateValidation,
  async (req, res, next) => {
    const idParameter = Number.parseInt(req.params.id, 10);

    // Check validation errors
    const firstError = checkValidationErrors(req, logger);
    if (firstError) {
      return next(firstError);
    }

    // Sanitized inputs
    const data = matchedData(req);

    try {
      // Check if a department exists with an ID equal to id
      const checkExistenceResult = await checkExistence(
        { id: idParameter },
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
        idParameter,
        Department,
        logger,
      );
      if (anotherRecordIssue) {
        return next(anotherRecordIssue);
      }

      if (data.head) {
        // Check if an employee exists with id equal to head
        const query = { id: data.head };
        const checkExistenceResult = await checkExistence(
          query,
          Employee,
          logger,
        );
        if (checkExistenceResult[0] === 1) {
          return next(checkExistenceResult[1]);
        }
      }

      // Compute employeesNumber
      const employeesNumber = await getEmployeesNumber(data.name, logger);

      // Update department
      const toUpdate = {
        name: data.name || department.name,
        employeesNumber,
        head: data.head || department.head,
        budget: data.budget || department.budget,
        email: data.email || department.email,
        phone: data.phone || department.phone,
      };
      updateRecord(Department, idParameter, toUpdate, logger);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json("Department successfully updated");
  },
);

module.exports = adminRouter;
