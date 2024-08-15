const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Department = require("../../src/back-end/models/department");
const DepartmentsDummyData = require("./departmentsDummyData");

let assert;
before(async () => {
  const chaiModule = await import("chai");
  assert = chaiModule.assert;
});

let mongoServer;
before(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    if (!mongoose.connection.db) {
      throw new Error("Failed to get database connection");
    }
    console.log("MongoDB setup complete");
  } catch (err) {
    console.log("Error during MongoDB setup", err);
  }
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Department model", () => {
  // Test 1
  it("should create a new department", async () => {
    const department = new Department(DepartmentsDummyData.one);
    const savedDepartment = await department.save();
    assert.exists(savedDepartment.id, "Department must have an id property");
    assert.isTrue(
      Number.isInteger(savedDepartment.id),
      "id must be an integer",
    );
    assert.strictEqual(savedDepartment.id, 1, "id must be strictly equal to 1");
    assert.exists(savedDepartment.name, "Department must have a name");
    assert.isString(savedDepartment.name, "name must be a string");
    assert.strictEqual(
      savedDepartment.name,
      "Finance",
      "name must be strictly equal to Finance",
    );
    assert.exists(
      savedDepartment.employeesNumber,
      "Department must have an employeesNumber field",
    );
    assert.isTrue(
      Number.isInteger(savedDepartment.employeesNumber),
      "employeesNumber must be an integer",
    );
    assert.strictEqual(
      savedDepartment.employeesNumber,
      15,
      "employeesNumber must be strictly equal to 15",
    );
    assert.exists(
      savedDepartment.budget,
      "Department must have a budget field",
    );
    assert.isTrue(
      Number.isInteger(savedDepartment.budget),
      "budget must be an integer",
    );
    assert.strictEqual(
      savedDepartment.budget,
      1000000,
      "budget must be equal to 1,000,000",
    );
    assert.exists(
      savedDepartment.email,
      "Department must have an email property",
    );
    assert.isString(savedDepartment.email, "email must be a string");
    assert.match(
      savedDepartment.email,
      /^(?!.*\.\.)[^\s@]+[^.]@[^.][^\s@]+\.[^\s@]+$/,
      "email must match the prescribed regex",
    );
    assert.strictEqual(
      savedDepartment.email,
      "good.department@example.com",
      "email must be strictly equal to good.department@example.com",
    );
    assert.exists(
      savedDepartment.phone,
      "Department must have a phone property",
    );
    assert.isString(savedDepartment.phone, "phone must be a string");
    assert.match(
      savedDepartment.phone,
      /^\+\d{7,15}$/,
      "phone must match the prescribed regex",
    );
    assert.strictEqual(
      savedDepartment.phone,
      "+1234567890",
      "phone must be strictly equal to +1234567890",
    );
  });

  // Test 2
  it("should fail to create a department without an id", async () => {
    try {
      const department = new Department(DepartmentsDummyData.two);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.id.kind, "required");
      assert.strictEqual(err.errors.id.path, "id");
    }
  });

  // Test 3
  it("should fail to create a department with an id not a number", async () => {
    try {
      const department = new Department(DepartmentsDummyData.three);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.id.kind, "Number");
      assert.strictEqual(err.errors.id.path, "id");
    }
  });

  // Test 4
  it("should fail to create a department with an id not an integer", async () => {
    try {
      const department = new Department(DepartmentsDummyData.four);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.id.kind, "user defined");
      assert.strictEqual(err.errors.id.path, "id");
    }
  });

  // Test 5
  it("should fail to create a department with an id less than the minimum", async () => {
    try {
      const department = new Department(DepartmentsDummyData.five);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.id.kind, "min");
      assert.strictEqual(err.errors.id.path, "id");
    }
  });

  // Test 6
  it("should fail to create a department with an id greater than the maximum", async () => {
    try {
      const department = new Department(DepartmentsDummyData.six);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.id.kind, "max");
      assert.strictEqual(err.errors.id.path, "id");
    }
  });

  // Test 7
  it("should fail to create a department without a name", async () => {
    try {
      const department = new Department(DepartmentsDummyData.seven);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.name.kind, "required");
      assert.strictEqual(err.errors.name.path, "name");
    }
  });

  // Test 8
  it("should fail to create a department with an invalid name", async () => {
    try {
      const department = new Department(DepartmentsDummyData.eight);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.name.kind, "enum");
      assert.strictEqual(err.errors.name.path, "name");
    }
  });

  // Test 9
  it("should create a department with an employeesNumber value of zero when not provided", async () => {
    const department = new Department(DepartmentsDummyData.nine);
    const savedDepartment = await department.save();
    assert.exists(
      savedDepartment.employeesNumber,
      "Department must records the number of employees",
    );
    assert.isTrue(
      Number.isInteger(savedDepartment.employeesNumber),
      "employeesNumber must be an integer",
    );
    assert.strictEqual(
      savedDepartment.employeesNumber,
      0,
      "employeesNumber must be strictly equal to 0",
    );
  });

  // Test 10
  it("should fail to create a department with an employeesNumber not a number", async () => {
    try {
      const department = new Department(DepartmentsDummyData.ten);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.employeesNumber.kind, "Number");
      assert.strictEqual(err.errors.employeesNumber.path, "employeesNumber");
    }
  });

  // Test 11
  it("should fail to create a department with an employeesNumber not an integer", async () => {
    try {
      const department = new Department(DepartmentsDummyData.eleven);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.employeesNumber.kind, "user defined");
      assert.strictEqual(err.errors.employeesNumber.path, "employeesNumber");
    }
  });

  // Test 12
  it("should fail to create a department with an employeesNumber less than the minimum", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twelve);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.employeesNumber.kind, "min");
      assert.strictEqual(err.errors.employeesNumber.path, "employeesNumber");
    }
  });

  // Test 13
  it("should create a department with a budget value of zero when not provided", async () => {
    const department = new Department(DepartmentsDummyData.thirteen);
    const savedDepartment = await department.save();
    assert.exists(savedDepartment.budget, "Department must have a budget");
    assert.isTrue(
      Number.isInteger(savedDepartment.budget),
      "budget must be an integer",
    );
    assert.strictEqual(
      savedDepartment.budget,
      0,
      "budget must be strictly equal to 0",
    );
  });

  // Test 14
  it("should fail to create a department with a budget not a number", async () => {
    try {
      const department = new Department(DepartmentsDummyData.fourteen);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.budget.kind, "Number");
      assert.strictEqual(err.errors.budget.path, "budget");
    }
  });

  // Test 15
  it("should fail to create a department with a budget not an integer", async () => {
    try {
      const department = new Department(DepartmentsDummyData.fifteen);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.budget.kind, "user defined");
      assert.strictEqual(err.errors.budget.path, "budget");
    }
  });

  // Test 16
  it("should fail to create a department with a budget less than the minimum", async () => {
    try {
      const department = new Department(DepartmentsDummyData.sixteen);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.budget.kind, "min");
      assert.strictEqual(err.errors.budget.path, "budget");
    }
  });

  // Test 17
  it("should fail to create a department without an email", async () => {
    try {
      const department = new Department(DepartmentsDummyData.seventeen);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "required");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 18
  it("should fail to create a department with an invalid email", async () => {
    try {
      const department = new Department(DepartmentsDummyData.eighteen);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "regexp");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 19
  it("should fail to create a department with an invalid email-2", async () => {
    try {
      const department = new Department(DepartmentsDummyData.nineteen);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "regexp");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 20
  it("should fail to create a department with an invalid email-3", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twenty);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "regexp");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 21
  it("should fail to create a department with an invalid email-4", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentyOne);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "regexp");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 22
  it("should fail to create a department with an invalid email-5", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentyTwo);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "regexp");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 23
  it("should fail to create a department with an invalid email-6", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentyThree);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "regexp");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 24
  it("should fail to create a department with an invalid email-7", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentyFour);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, "regexp");
      assert.strictEqual(err.errors.email.path, "email");
    }
  });

  // Test 25
  it("should fail to create a department without a phone number", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentyFive);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.phone.kind, "required");
      assert.strictEqual(err.errors.phone.path, "phone");
    }
  });

  // Test 26
  it("should fail to create a department with an invalid phone number", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentySix);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.phone.kind, "regexp");
      assert.strictEqual(err.errors.phone.path, "phone");
    }
  });

  // Test 27
  it("should fail to create a department with an invalid phone number-2", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentySeven);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.phone.kind, "regexp");
      assert.strictEqual(err.errors.phone.path, "phone");
    }
  });

  // Test 28
  it("should fail to create a department with an invalid phone number-3", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentyEight);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.phone.kind, "regexp");
      assert.strictEqual(err.errors.phone.path, "phone");
    }
  });

  // Test 29
  it("should fail to create a department with an invalid phone number-4", async () => {
    try {
      const department = new Department(DepartmentsDummyData.twentyNine);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.phone.kind, "regexp");
      assert.strictEqual(err.errors.phone.path, "phone");
    }
  });

  // Test 30
  it("should fail to create a department with an invalid phone number-5", async () => {
    try {
      const department = new Department(DepartmentsDummyData.thirty);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errors.phone.kind, "regexp");
      assert.strictEqual(err.errors.phone.path, "phone");
    }
  });

  // Test 31
  it("should fail to create a department with a duplicate id", async () => {
    try {
      const department = new Department(DepartmentsDummyData.thirtyOne);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errorResponse.code, 11000);
      assert.strictEqual(err.errorResponse.keyPattern.id, 1);
    }
  });

  // Test 32
  it("should fail to create a department with a duplicate name", async () => {
    try {
      const department = new Department(DepartmentsDummyData.thirtyTwo);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errorResponse.code, 11000);
      assert.strictEqual(err.errorResponse.keyPattern.name, 1);
    }
  });

  // Test 33
  it("should fail to create a department with a duplicate email", async () => {
    try {
      const department = new Department(DepartmentsDummyData.thirtyThree);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errorResponse.code, 11000);
      assert.strictEqual(err.errorResponse.keyPattern.email, 1);
    }
  });

  // Test 34
  it("should fail to create a department with a duplicate phone", async () => {
    try {
      const department = new Department(DepartmentsDummyData.thirtyFour);
      await department.save();
      assert.fail("Expected validation error not thrown");
    } catch (err) {
      assert.strictEqual(err.errorResponse.code, 11000);
      assert.strictEqual(err.errorResponse.keyPattern.phone, 1);
    }
  });
});
