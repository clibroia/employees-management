const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Employee schema
const EmployeeSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    min: 1001,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer",
    },
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  department: {
    name: {
      type: String,
      required: true,
      enum: [
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
    },
    head: {
      type: Boolean,
      required: false,
    },
  },
  role: {
    type: String,
    required: true,
    enum: [
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
  },
  hiredOn: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(?!.*\.\.)[^\s@]+[^.]@[^.][^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address",
    ],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+\d{7,15}$/, "Please enter a valid phone number"],
  },
  password: {
    type: String,
    required: true,
  },
});

// Indexes
EmployeeSchema.index({ id: 1 });
EmployeeSchema.index({ email: 1 });
EmployeeSchema.index({ phone: 1 });

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
