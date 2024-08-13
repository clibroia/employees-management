const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")
const Employee = require("../../src/back-end/models/employee")
const EmployeesDummyData = require("./employeesDummyData")

let assert
before(async () => {
    const chaiModule = await import("chai")
    assert = chaiModule.assert
})

let mongoServer
before(async () => {
    try {
        mongoServer = await MongoMemoryServer.create()
        const uri = mongoServer.getUri()
        await mongoose.connect(uri)
        if(!mongoose.connection.db) {
            throw new Error("Failed to get database connection")
        }
        console.log("MongoDB setup complete")
    } catch(err) {
        console.log("Error during MongoDB setup", err)
    }
})

after(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe("Employee model", () => {

    // Test 1
    it("should create a new employee", async () => {
        const employeeDataWithMiddleName = {
            ...EmployeesDummyData.one,
            name: {
                firstName: EmployeesDummyData.one.name.firstName,
                middleName: "Marie",
                lastName: EmployeesDummyData.one.name.lastName
            }
        }
        const employee = new Employee(employeeDataWithMiddleName)
        const savedEmployee = await employee.save()
        assert.exists(savedEmployee.id, "Employee must have an id property")
        assert.isTrue(Number.isInteger(savedEmployee.id), "id property must be an integer")
        assert.strictEqual(savedEmployee.id, 1001, "id must be strictly equal to 1001")
        assert.strictEqual(savedEmployee.name.firstName, "Alice", "firstName must be strictly equal to Alice")
        assert.strictEqual(savedEmployee.name.middleName, "Marie", "middleName must be strictly equal to Marie")
        assert.strictEqual(savedEmployee.name.lastName, "Johnson", "lastName must be strictly equal to Johnson")
        assert.exists(savedEmployee.department.name, "department name is required")
        assert.isString(savedEmployee.department.name, "department name should be a string")
        assert.strictEqual(savedEmployee.department.name, "HR", "department name must be strictly equal to HR")
        assert.exists(savedEmployee.role, "Employee must have a role property")
        assert.isString(savedEmployee.role, "role property must be a string")
        assert.strictEqual(savedEmployee.role, "Manager", "role must be strictly equal to Manager")
        assert.exists(savedEmployee.hiredOn, "Employee must have a hire date")
        assert.instanceOf(savedEmployee.hiredOn, Date, "hiredOn property must be an instance of Date")
        assert.strictEqual(savedEmployee.hiredOn.toISOString().split("T")[0], "2020-01-15", "hiredOn property must be strictly equal to 2020-01-15")
        assert.exists(savedEmployee.email, "Employee must have an email")
        assert.isString(savedEmployee.email, "email must be a string")
        assert.match(savedEmployee.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email must match the prescribed regex")
        assert.strictEqual(savedEmployee.email, "alice.johnson@example.com", "email must be strictly equal to alice.johnson@example.com")
        assert.exists(savedEmployee.phone, "Employee must have a phone number")
        assert.isString(savedEmployee.phone, "phone property must be a string")
        assert.match(savedEmployee.phone, /^\+[0-9]+$/, "phone must match the prescribed regex")
        assert.strictEqual(savedEmployee.phone, "+1234567890", "phone must be strictly equal to +1234567890")
        assert.exists(savedEmployee.password, "Employee must have a password")
        assert.isString(savedEmployee.password, "password property must be a string")
        assert.strictEqual(savedEmployee.password, "$2b$10$4iHU2xivvDl7wIWjAeoX0.mP5s6RxNP5.WwMMlOYwvse13MaFllAG", "password must be strictly equal to $2b$10$4iHU2xivvDl7wIWjAeoX0.mP5s6RxNP5.WwMMlOYwvse13MaFllAG")
    })

    // Test 2
    it("should create a new employee without middle name", async () => {
        const employee = new Employee(EmployeesDummyData.two)
        const savedEmployee = await employee.save()
        assert.exists(savedEmployee.id, "Employee must have an id property")
        assert.isTrue(Number.isInteger(savedEmployee.id), "id property must be an integer")
        assert.strictEqual(savedEmployee.id, 1002, "id must be strictly equal to 1002")
        assert.strictEqual(savedEmployee.name.firstName, "Bob", "firstName must be strictly equal to Alice")
        assert.strictEqual(savedEmployee.name.lastName, "Smith", "lastName must be strictly equal to Johnson")
        assert.exists(savedEmployee.department.name, "department name is required")
        assert.isString(savedEmployee.department.name, "department name should be a string")
        assert.strictEqual(savedEmployee.department.name, "Finance", "department name must be strictly equal to HR")
        assert.exists(savedEmployee.role, "Employee must have a role property")
        assert.isString(savedEmployee.role, "role property must be a string")
        assert.strictEqual(savedEmployee.role, "Manager", "role must be strictly equal to Manager")
        assert.exists(savedEmployee.hiredOn, "Employee must have a hire date")
        assert.instanceOf(savedEmployee.hiredOn, Date, "hiredOn property must be an instance of Date")
        assert.strictEqual(savedEmployee.hiredOn.toISOString().split("T")[0], "2018-06-01", "hiredOn property must be strictly equal to 2018-06-01")
        assert.exists(savedEmployee.email, "Employee must have an email")
        assert.isString(savedEmployee.email, "email must be a string")
        assert.match(savedEmployee.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email must match the prescribed regex")
        assert.strictEqual(savedEmployee.email, "bob.smith@example.com", "email must be strictly equal to bob.smith@example.com")
        assert.exists(savedEmployee.phone, "Employee must have a phone number")
        assert.isString(savedEmployee.phone, "phone property must be a string")
        assert.match(savedEmployee.phone, /^\+[0-9]+$/, "phone must match the prescribed regex")
        assert.strictEqual(savedEmployee.phone, "+1987654321", "phone must be strictly equal to +1987654321")
        assert.exists(savedEmployee.password, "Employee must have a password")
        assert.isString(savedEmployee.password, "password property must be a string")
        assert.strictEqual(savedEmployee.password, "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe", "password must be strictly equal to $2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe")
    })

    // Test 3
    it("should fail to create an employee without id", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.three)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.id.kind, "required")
            assert.strictEqual(err.errors.id.path, "id")
        }
    })

    // Test 4
    it("should fail to create an employee with an id not a number", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.four)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.id.kind, "Number")
            assert.strictEqual(err.errors.id.path, "id")
        }
    })

    // Test 5
    it("should fail to create an employee with an id not an integer", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.five)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.id.kind, "user defined")
            assert.strictEqual(err.errors.id.path, "id")
        }
    })

    // Test 6
    it("should fail to create an employee with an id less than the minimum value", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.six)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.id.kind, "min")
            assert.strictEqual(err.errors.id.path, "id")
        }
    })

    // Test 7
    it("should fail to create an employee without firstName", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.seven)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors["name.firstName"].kind, "required")
            assert.strictEqual(err.errors["name.firstName"].path, "name.firstName")
        }
    })

    // Test 8
    it("should fail to create an employee without lastName", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.eight)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors["name.lastName"].kind, "required")
            assert.strictEqual(err.errors["name.lastName"].path, "name.lastName")
        }
    })

    // Test 9
    it("should fail to create an employee without departmentName", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.nine)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors["department.name"].kind, "required")
            assert.strictEqual(err.errors["department.name"].path, "department.name")
        }
    })

    // Test 10
    it("should fail to create an employee with an invalid departmentName", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.ten)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors["department.name"].kind, "enum")
            assert.strictEqual(err.errors["department.name"].path, "department.name")
        }
    })

    // Test 11
    it("should fail to create an employee with a department head property not boolean", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.eleven)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors["department.head"].kind, "Boolean")
            assert.strictEqual(err.errors["department.head"].path, "department.head")
        }
    })

    // Test 12
    it("should fail to create an employee without a role", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twelve)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.role.kind, "required")
            assert.strictEqual(err.errors.role.path, "role")
        }
    })

    // Test 13
    it("should fail to create an employee with an invalid role", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.thirteen)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.role.kind, "enum")
            assert.strictEqual(err.errors.role.path, "role")
        }
    })

    // Test 14
    it("should fail to create an employee without a hire date", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.fourteen)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.hiredOn.kind, "required")
            assert.strictEqual(err.errors.hiredOn.path, "hiredOn")
        }
    })

    // Test 15
    it("should fail to create an employee with an invalid hire date", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.fifteen)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.hiredOn.kind, "date")
            assert.strictEqual(err.errors.hiredOn.path, "hiredOn")
        }
    })

    // Test 16
    it("should fail to create an employee without an email", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.sixteen)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "required")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 17
    it("should fail to create an employee with an invalid email", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.seventeen)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "regexp")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 18
    it("should fail to create an employee with an invalid email-2", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.eighteen)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "regexp")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 19
    it("should fail to create an employee with an invalid email-3", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.nineteen)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "regexp")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 20
    it("should fail to create an employee with an invalid email-4", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twenty)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "regexp")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 21
    it("should fail to create an employee with an invalid email-5", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentyOne)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "regexp")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 22
    it("should fail to create an employee with an invalid email-6", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentyTwo)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "regexp")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 23
    it("should fail to create an employee with an invalid email-7", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentyThree)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.email.kind, "regexp")
            assert.strictEqual(err.errors.email.path, "email")
        }
    })

    // Test 24
    it("should fail to create an employee without a phone number", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentyFour)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.phone.kind, "required")
            assert.strictEqual(err.errors.phone.path, "phone")
        }
    })

    // Test 25
    it("should fail to create an employee with an invalid phone number", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentyFive)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.phone.kind, "regexp")
            assert.strictEqual(err.errors.phone.path, "phone")
        }
    })

    // Test 26
    it("should fail to create an employee with an invalid phone number-2", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentySix)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.phone.kind, "regexp")
            assert.strictEqual(err.errors.phone.path, "phone")
        }
    })

    // Test 27
    it("should fail to create an employee with an invalid phone number-3", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentySeven)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.phone.kind, "regexp")
            assert.strictEqual(err.errors.phone.path, "phone")
        }
    })

    // Test 28
    it("should fail to create an employee with an invalid phone number-4", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentyEight)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.phone.kind, "regexp")
            assert.strictEqual(err.errors.phone.path, "phone")
        }
    })

    // Test 29
    it("should fail to create an employee with an invalid phone number-5", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.twentyNine)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.phone.kind, "regexp")
            assert.strictEqual(err.errors.phone.path, "phone")
        }
    })

    // Test 30
    it("should fail to create an employee without a password", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.thirty)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errors.password.kind, "required")
            assert.strictEqual(err.errors.password.path, "password")
        }
    })

    // Test 31
    it("should fail to create an employee with a duplicate id", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.thirtyOne)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errorResponse.code, 11000)
            assert.strictEqual(err.errorResponse.keyPattern.id, 1)
        }
    })

    // Test 32
    it("should fail to create an employee with a duplicate email", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.thirtyTwo)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errorResponse.code, 11000)
            assert.strictEqual(err.errorResponse.keyPattern.email, 1)
        }
    })

    // Test 33
    it("should fail to create an employee with a duplicate phone number", async () => {
        try {
            const employee = new Employee(EmployeesDummyData.thirtyThree)
            await employee.save()
            assert.fail("Expected validation error not thrown")
        } catch(err) {
            assert.strictEqual(err.errorResponse.code, 11000)
            assert.strictEqual(err.errorResponse.keyPattern.phone, 1)
        }
    })
})