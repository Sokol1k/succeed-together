const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('private_lists').del()
    .then(function () {
      // Inserts seed entries
      return knex('private_lists').insert([{
          user_id: 1,
          title: faker.lorem.sentence(),
          index: 2
        },
        {
          user_id: 1,
          title: faker.lorem.sentence(),
          index: 3
        },
        {
          user_id: 1,
          title: faker.lorem.sentence(),
          index: 1
        },
        {
          user_id: 2,
          title: faker.lorem.sentence(),
          index: 1
        },
        {
          user_id: 2,
          title: faker.lorem.sentence(),
          index: 2
        },
        {
          user_id: 2,
          title: faker.lorem.sentence(),
          index: 3
        },
        {
          user_id: 3,
          title: faker.lorem.sentence(),
          index: 1
        },
        {
          user_id: 3,
          title: faker.lorem.sentence(),
          index: 2
        },
        {
          user_id: 3,
          title: faker.lorem.sentence(),
          index: 3
        },
      ]);
    });
};