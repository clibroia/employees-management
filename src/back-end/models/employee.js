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
      message: "{VALUE} is not an integer"
    },
  },
  name: {
    firstName: {
      type: String,
      required: true
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
  },
  hiredOn: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^(?!.*\.\.)[^\s@]+[^\.]@[^\.][^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
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
