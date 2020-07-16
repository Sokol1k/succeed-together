const faker = require("faker");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('private_tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('private_tasks').insert([
        {
          private_list_id: 1,
          text: faker.lorem.sentence(),
        },
        {
          private_list_id: 1,
          text: faker.lorem.sentence(),
          date: faker.date.future(2),
        },
        {
          private_list_id: 1,
          text: faker.lorem.sentence(),
          deadline: faker.date.future(2),
        },
        {
          private_list_id: 1,
          text: faker.lorem.sentence(),
          date: faker.date.future(2),
          deadline: faker.date.future(2),
        }
      ]);
    });
};
