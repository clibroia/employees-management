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

module.exports = { credentialsValidation };
