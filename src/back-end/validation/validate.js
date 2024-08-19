const { checkSchema } = require("express-validator");

const credentialsValidation = checkSchema(
  {
    email: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Email cannot be empty if provided",
      },
      toLowerCase: true,
      matches: {
        options: /^(?!.*\.\.)[^\s@]+[^.]@[^.][^\s@]+\.[^\s@]+$/,
        errorMessage: "[VALIDATION ERROR] Invalid email format",
      },
      escape: true,
    },
    phone: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Phone cannot be empty if provided",
      },
      matches: {
        options: /^\+\d{7,15}$/,
        errorMessage:
          "[VALIDATION ERROR] Invalid phone number. Use format with international prefix (+1234567890)",
      },
      escape: true,
    },
    password: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Password is required",
      },
      escape: true,
    },
    role: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Role is required",
      },
      toUpperCase: true,
      isIn: {
        options: [["ADMIN", "EMPLOYEE"]],
        errorMessage:
          "[VALIDATION ERROR] Invalid role. Please insert a valid one",
      },
      escape: true,
    },
  },
  ["body"],
);

const employeeValidation = checkSchema(
  {
    "name.firstName": {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] First name is required",
      },
      toUpperCase: true,
      escape: true,
    },
    "name.middleName": {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage:
          "[VALIDATION ERROR] Middle name cannot be empty if provided",
      },
      toUpperCase: true,
      escape: true,
    },
    "name.lastName": {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Last name is required",
      },
      toUpperCase: true,
      escape: true,
    },
    "department.name": {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Department name is required",
      },
      toUpperCase: true,
      isIn: {
        options: [
          [
            "HR",
            "FINANCE",
            "SALES",
            "CUSTOMER SERVICE",
            "IT",
            "OPERATIONS",
            "R&D",
            "LEGAL",
            "ADMINISTRATIVE",
            "PROCUREMENT",
          ],
        ],
        errorMessage:
          "[VALIDATION ERROR] Invalid department name. Please select a valid department",
      },
      escape: true,
    },
    "department.head": {
      optional: true,
      isBoolean: {
        errorMessage: "[VALIDATION ERROR] Head must be a boolean value",
      },
      toBoolean: true,
    },
    role: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Role is required",
      },
      toUpperCase: true,
      isIn: {
        options: [
          [
            "CLERK L1",
            "CLERK L2",
            "CLERK L3",
            "CLERK L4",
            "CLERK L5",
            "CLERK L6",
            "ASSISTANT MANAGER",
            "MANAGER",
            "SENIOR MANAGER",
            "DIRECTOR",
            "VICE-PRESIDENT",
            "PRESIDENT",
            "CHIEF OPERATING OFFICER",
            "CHIEF FINANCIAL OFFICER",
            "CHIEF EXECUTIVE OFFICER",
          ],
        ],
        errorMessage:
          "[VALIDATION ERROR] Invalid role. Please select a valid role",
      },
      escape: true,
    },
    hiredOn: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Hire date is required",
      },
      isISO8601: {
        options: { strict: true },
        errorMessage: "[VALIDATION ERROR] Invalid date format. Use YYYY-MM-DD",
      },
      toDate: true,
    },
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Email is required",
      },
      toLowerCase: true,
      matches: {
        options: /^(?!.*\.\.)[^\s@]+[^.]@[^.][^\s@]+\.[^\s@]+$/,
        errorMessage: "[VALIDATION ERROR] Invalid email format",
      },
      escape: true,
    },
    phone: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Phone number is required",
      },
      matches: {
        options: /^\+\d{7,15}$/,
        errorMessage:
          "[VALIDATION ERROR] Invalid phone number. Use format with international prefix (+1234567890)",
      },
    },
  },
  ["body"],
);

const departmentValidation = checkSchema(
  {
    name: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Department name is required",
      },
      toUpperCase: true,
      isIn: {
        options: [
          [
            "HR",
            "FINANCE",
            "SALES",
            "CUSTOMER SERVICE",
            "IT",
            "OPERATIONS",
            "R&D",
            "LEGAL",
            "ADMINISTRATIVE",
            "PROCUREMENT",
          ],
        ],
        errorMessage:
          "[VALIDATION ERROR] Invalid department name. Please select a valid department",
      },
      escape: true,
    },
    budget: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Budget is required",
      },
      isInt: {
        options: {
          min: 0,
          allow_leading_zeroes: false,
        },
        errorMessage:
          "[VALIDATION ERROR] Budget must be a non-negative integer without leading zeroes",
      },
    },
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Email is required",
      },
      toLowerCase: true,
      matches: {
        options: /^(?!.*\.\.)[^\s@]+[^.]@[^.][^\s@]+\.[^\s@]+$/,
        errorMessage: "[VALIDATION ERROR] Invalid email format",
      },
      escape: true,
    },
    phone: {
      trim: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Phone number is required",
      },
      matches: {
        options: /^\+\d{7,15}$/,
        errorMessage:
          "[VALIDATION ERROR] Invalid phone number. Use format with international prefix (+1234567890)",
      },
    },
  },
  ["body"],
);

module.exports = {
  credentialsValidation,
  departmentValidation,
  employeeValidation,
};
