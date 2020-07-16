const faker = require("faker");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          user_id: 2,
          publication_id: 1,
          text: faker.lorem.text()
        },
        {
          user_id: 3,
          publication_id: 1,
          text: faker.lorem.text()
        }
      ]);
    });
};
