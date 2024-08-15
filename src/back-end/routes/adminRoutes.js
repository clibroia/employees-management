require("dotenv").config();
//const { MongoClient } = require("mongodb").MongoClient
const express = require("express");
const {
  validationResult,
  checkSchema,
  matchedData,
} = require("express-validator");
//const bcryptjs = require("bcrypt")
//const jwt = require("jsonwebtoken")

const adminRouter = express.Router();

//const jwtSecret = `${process.env.JWT_SECRET}`

adminRouter.post(
  "/new-employee",
  // Schema validation middleware
  checkSchema(
    {
      "name.firstName": {
        trim: true,
        notEmpty: {
          errorMessage: "[Validation Error] First name is required",
        },
      },
      "name.middleName": {
        trim: true,
        optional: true,
        notEmpty: {
          errorMessage:
            "[Validation Error] Middle name cannot be empty if provided",
        },
      },
      "name.lastName": {
        trim: true,
        notEmpty: {
          errorMessage: "[Validation Error] Last name is required",
        },
      },
      "department.name": {
        trim: true,
        notEmpty: {
          errorMessage: "[Validation Error] Department name is required",
        },
        isIn: {
          options: [
            [
              "HR",
              "Finance",
              "Sales",
              "Customer Service",
              "IT",
              "Operations",
              "R&D",
              "Legal",
              "Administrative",
              "Procurement",
            ],
          ],
          errorMessage:
            "[Validation Error] Invalid department name. Please select a valid department",
        },
      },
      "department.head": {
        optional: true,
        isBoolean: {
          errorMessage: "[Validation Error] Head must be a boolean value",
        },
        toBoolean: true,
      },
      role: {
        trim: true,
        notEmpty: {
          errorMessage: "[Validation Error] Role is required",
        },
        isIn: {
          options: [
            [
              "Clerk L1",
              "Clerk L2",
              "Clerk L3",
              "Clerk L4",
              "Clerk L5",
              "Clerk L6",
              "Assistant Manager",
              "Manager",
              "Senior Manager",
              "Director",
              "Vice-President",
              "President",
              "Chief Operating Officer",
              "Chief Financial Officer",
              "Chief Executive Officer",
            ],
          ],
          errorMessage:
            "[Validation Error] Invalid role. Please select a valid role",
        },
      },
      hiredOn: {
        trim: true,
        notEmpty: {
          errorMessage: "[Validation Error] Hire date is required",
        },
        isISO8601: {
          options: { strict: true },
          errorMessage:
            "[Validation Error] Invalid date format. Use YYYY-MM-DD",
        },
        toDate: true,
      },
      email: {
        trim: true,
        notEmpty: {
          errorMessage: "[Validation Error] Email is required",
        },
        matches: {
          options: /^(?!.*\.\.)[^\s@]+[^.]@[^.][^\s@]+\.[^\s@]+$/,
          errorMessage: "[Validation Error] Invalid email format",
        },
      },
      phone: {
        trim: true,
        notEmpty: {
          errorMessage: "[Validation Error] Phone number is required",
        },
        matches: {
          options: /^\+\d{7,15}$/,
          errorMessage:
            "[Validation Error] Invalid phone number. Use format with international prefix (+1234567890)",
        },
      },
    },
    ["body"],
  ),
  // Handling request
  async (req, res, next) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array({ onlyFirstError: true })[0]);
    }

    // Sanitize inputs
    const data = matchedData(req);
    for (let key in data) {
      console.log(`${key}: ${data[key]}\n`);
    }

    res.send("Everything OK");
  },
);

module.exports = adminRouter;
