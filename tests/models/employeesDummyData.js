const EmployeesDummyData = {
  one: {
    id: 1001,
    name: {
      firstName: "Alice",
      lastName: "Johnson",
    },
    department: {
      name: "HR",
    },
    role: "Manager",
    hiredOn: "2020-01-15",
    email: "alice.johnson@example.com",
    phone: "+1234567890",
    password: "$2b$10$4iHU2xivvDl7wIWjAeoX0.mP5s6RxNP5.WwMMlOYwvse13MaFllAG",
  },

  two: {
    id: 1002,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "bob.smith@example.com",
    phone: "+1987654321",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  three: {
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.id@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  four: {
    id: "NotANumber",
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.id@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  five: {
    id: 1035.4,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.id@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  six: {
    id: 955,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.id@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  seven: {
    id: 1005,
    name: {
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.firstName@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  eight: {
    id: 1005,
    name: {
      firstName: "Bob",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.lastName@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  nine: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {},
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.departmentName@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  ten: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "FantasyDept",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.departmentName@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  eleven: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
      head: "Yes",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.departmentHead@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twelve: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    hiredOn: "2018-06-01",
    email: "no.role@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  thirteen: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Superhero",
    hiredOn: "2018-06-01",
    email: "no.role@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  fourteen: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    email: "no.hiredOn@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  fifteen: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "MordorDate",
    email: "no.hiredOn@example.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  sixteen: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  seventeen: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "wrong.email@com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  eighteen: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "wrong.email.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  nineteen: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "wrong@email@edu.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twenty: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "wrongemail@.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentyOne: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "wrongemail.@edu.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentyTwo: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "wrong.email@.edu.com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentyThree: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "wrong.email@edu..com",
    phone: "+1111111111",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentyFour: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.phone@example.com",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentyFive: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.phone@example.com",
    phone: "+FantasyPhone",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentySix: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.phone@example.com",
    phone: "+12398755A2",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentySeven: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.phone@example.com",
    phone: "+123987",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentyEight: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.phone@example.com",
    phone: "+1239877777777777",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  twentyNine: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.phone@example.com",
    phone: "1239874562",
    password: "$2b$10$IZa7r1OoiSHy.vpLr9B7vuys9UWW60.j1oXOpmJJJqxJHgvwMtbPe",
  },

  thirty: {
    id: 1005,
    name: {
      firstName: "Bob",
      lastName: "Smith",
    },
    department: {
      name: "Finance",
    },
    role: "Manager",
    hiredOn: "2018-06-01",
    email: "no.password@example.com",
    phone: "+1239874562",
  },

  thirtyOne: {
    id: 1001,
    name: {
      firstName: "AliceTwo",
      lastName: "JohnsonTwo",
    },
    department: {
      name: "HR",
    },
    role: "Manager",
    hiredOn: "2020-01-15",
    email: "alice.johnson2@example.com",
    phone: "+12345678902",
    password: "$2b$10$4iHU2xivvDl7wIWjAeoX0.mP5s6RxNP5.WwMMlOYwvse13MaFllAG",
  },

  thirtyTwo: {
    id: 1100,
    name: {
      firstName: "AliceTwo",
      lastName: "JohnsonTwo",
    },
    department: {
      name: "HR",
    },
    role: "Manager",
    hiredOn: "2020-01-15",
    email: "alice.johnson@example.com",
    phone: "+12345678902",
    password: "$2b$10$4iHU2xivvDl7wIWjAeoX0.mP5s6RxNP5.WwMMlOYwvse13MaFllAG",
  },

  thirtyThree: {
    id: 1100,
    name: {
      firstName: "AliceTwo",
      lastName: "JohnsonTwo",
    },
    department: {
      name: "HR",
    },
    role: "Manager",
    hiredOn: "2020-01-15",
    email: "alice.johnson2@example.com",
    phone: "+1234567890",
    password: "$2b$10$4iHU2xivvDl7wIWjAeoX0.mP5s6RxNP5.WwMMlOYwvse13MaFllAG",
  },
};

module.exports = EmployeesDummyData;
