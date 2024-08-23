const { checkSchema } = require("express-validator");

const employeeCreateValidation = checkSchema(
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
    department: {
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

const employeeUpdateValidation = checkSchema(
  {
    "name.firstName": {
      trim: true,
      optional: true,
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
      optional: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Last name is required",
      },
      toUpperCase: true,
      escape: true,
    },
    department: {
      trim: true,
      optional: true,
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
    role: {
      trim: true,
      optional: true,
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
      optional: true,
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
      optional: true,
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
      optional: true,
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

const departmentCreateValidation = checkSchema(
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
    head: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Head cannot be empty if provided",
      },
      isInt: {
        options: {
          min: 1001,
          allow_leading_zeroes: false,
        },
        errorMessage:
          "[VALIDATION ERROR] Head must an integer greater than 1000",
      },
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

const departmentUpdateValidation = checkSchema(
  {
    name: {
      trim: true,
      optional: true,
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
    head: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: "[VALIDATION ERROR] Head cannot be empty if provided",
      },
      isInt: {
        options: {
          min: 1001,
          allow_leading_zeroes: false,
        },
        errorMessage:
          "[VALIDATION ERROR] Head must an integer greater than 1000",
      },
    },
    budget: {
      trim: true,
      optional: true,
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
      optional: true,
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
      optional: true,
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
  departmentCreateValidation,
  departmentUpdateValidation,
  employeeCreateValidation,
  employeeUpdateValidation,
};
