const { getLogger } = require("../utils/logger");
const { validationResult } = require("express-validator");

const validateIdParameter = (req, res, next) => {
  const logger = getLogger();
  const idParameter = req.params.id;
  let modelName = null;
  if (req.route.path.includes("employee")) {
    modelName = "Employee";
  }
  if (req.route.path.includes("department")) {
    modelName = "Department";
  }
  if (!modelName) {
    logger.warn("[NOT FOUND] The requested endpoint doesn't exist");
    const error = new Error();
    error.msg = "[NOT FOUND] The requested endpoint doesn't exist";
    return next(error);
  }
  let regex, minValue, maxValue;
  switch (modelName) {
    case "Employee":
      regex = /^[1-9]\d{3,}$/;
      minValue = 1001;
      maxValue = Infinity;
      break;
    case "Department":
      regex = /^[1-9]\d{0,2}$/;
      minValue = 1;
      maxValue = 100;
      break;
    default: {
      logger.error("[SERVER ERROR] Error determining the model name");
      const error = new Error();
      error.msg = "[SERVER ERROR] Error determining the model name";
      return next(error);
    }
  }
  if (!idParameter.match(regex)) {
    logger.warn(
      "[PARAMETER ERROR] Wrong structure for the provided id parameter",
    );
    const error = new Error();
    error.msg = "[PARAMETER ERROR] Invalid id parameter";
    return next(error);
  }
  const referencedId = Number.parseInt(idParameter, 10);
  if (!Number.isInteger(referencedId)) {
    logger.warn("[PARAMETER ERROR] A non-integer id parameter was provided");
    const error = new Error();
    error.msg = "[PARAMETER ERROR] Invalid id parameter";
    return next(error);
  }
  if (referencedId < minValue || referencedId > maxValue) {
    logger.warn(
      "[PARAMETER ERROR] An id parameter outside the accepted range was provided",
    );
    const error = new Error();
    error.msg = "[PARAMETER ERROR] Invalid id parameter";
    return next(error);
  }
  next();
};

/*
Purpose: Determine if there were any validation errors
Input: An Express request parameter and a valid Winston-implemented logger
Return value: first validation error, if present, or 0
*/
const checkValidationErrors = (req, logger) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array({ onlyFirstError: true })[0];
    logger.warn(firstError.msg);
    return firstError;
  }
  return 0;
};

module.exports = { checkValidationErrors, validateIdParameter };
