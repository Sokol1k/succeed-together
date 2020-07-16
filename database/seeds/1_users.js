const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456789", salt);
      // Inserts seed entries
      return knex('users').insert([
        {
          name: "Ivan Ivanov",
          email: "ivan99@gmail.com",
          role: "admin",
          password: hashedPassword
        },
        {
          name: "Vova Vovovich",
          email: "vova99@gmail.com",
          role: "user",
          password: hashedPassword
        },
        {
          name: "Nastia Petrova",
          email: "nastia99@gmail.com",
          role: "user",
          password: hashedPassword
        }
      ]);
    });
};


