const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Department schema
const DepartmentSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer"
        }
    },
    name: {
        type: String,
        required: true,
        unique: true,
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
            "Procurement"
        ]
    },
    employeesNumber: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer"
        }
    },
    budget: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(?!.*\.\.)[^\s@]+[^.]@[^.][^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
        ]
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+\d{7,15}$/, "Please enter a valid phone number"]
    }
})

const Department = mongoose.model("Department", DepartmentSchema)
module.exports = Department