const Employee = require("./../models/employee");

const anotherRecordExists = async (
  objectToCheck,
  id,
  mongooseModel,
  logger,
) => {
  let query, test;
  for (let key in objectToCheck) {
    if (objectToCheck[key]) {
      query = {};
      query[key] = objectToCheck[key];
      query.id = { $ne: id };
      test = await mongooseModel.findOne(query);
      if (test) {
        logger.warn(`[RESOURCE CONFLICT] ${key} already in use`);
        return { msg: `[RESOURCE CONFLICT] ${key} already in use` };
      }
    }
  }
  return 0;
};

const checkExistence = async (query, mongooseModel, logger) => {
  const record = await mongooseModel.findOne(query);
  if (!record) {
    logger.warn(
      `[NOT FOUND] Referenced ${mongooseModel.modelName} not in the database`,
    );
    return [1, { msg: "[NOT FOUND] Resource not found" }];
  }
  return [0, record];
};

const checkUniqueness = async (objectToCheck, mongooseModel, logger) => {
  try {
    let query, test;
    for (let key in objectToCheck) {
      query = {};
      query[key] = objectToCheck[key];
      test = await mongooseModel.findOne(query);
      if (test) {
        logger.warn(`[RESOURCE CONFLICT] ${key} already in use`);
        return { msg: `[RESOURCE CONFLICT] ${key} already in use` };
      }
    }
    return 0;
  } catch (err) {
    logger.error("[SERVER ERROR] Error executing read query", err);
    throw new Error();
  }
};

const getEmployeesNumber = async (departmentName, logger) => {
  try {
    const result = await Employee.aggregate([
      {
        $match: { "department.name": departmentName },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    const employeesNumber = result.length > 0 ? result[0].count : 0;
    return employeesNumber;
  } catch (err) {
    logger.error("[SERVER ERROR] Error executing aggregate query", err);
    throw new Error();
  }
};

const getNewId = async (mongooseModel, logger) => {
  try {
    let min;
    switch (mongooseModel.modelName) {
      case "Employee":
        min = 1000;
        break;
      case "Department":
        min = 0;
        break;
      default:
        logger.error("[SERVER ERROR] Error determining the model name");
        throw new Error();
    }
    const result = await mongooseModel.aggregate([
      {
        $group: {
          _id: null,
          maxId: { $max: "$id" },
        },
      },
    ]);
    const lastId = result.length > 0 ? result[0].maxId : min;
    return lastId + 1;
  } catch (err) {
    logger.error("[SERVER ERROR] Error executing aggregate query", err);
    throw new Error();
  }
};

const insertRecord = async (data, mongooseModel, logger) => {
  const newRecord = new mongooseModel(data);
  const savedNewRecord = await newRecord.save();
  if (!savedNewRecord) {
    logger.error("[SERVER ERROR] Error inserting a new employee");
    throw new Error();
  }
  logger.info(
    `[ADMIN ACTION] ${mongooseModel.modelName} created with id: ${savedNewRecord.id}`,
  );
};

const updateRecord = async (mongooseModel, id, updateObject, logger) => {
  const result = await mongooseModel.updateOne(
    {
      id: id,
    },
    {
      $set: updateObject,
    },
  );

  if (result.matchedCount !== 1) {
    logger.error("[SERVER ERROR] Error updating an employee record");
    throw new Error();
  }
  logger.info(
    `[ADMIN ACTION] Updated ${mongooseModel.modelName} with id: ${id}`,
  );
};

module.exports = {
  anotherRecordExists,
  checkExistence,
  checkUniqueness,
  getEmployeesNumber,
  getNewId,
  insertRecord,
  updateRecord,
};
