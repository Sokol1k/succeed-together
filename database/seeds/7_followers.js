exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('followers').del()
    .then(function () {
      // Inserts seed entries
      return knex('followers').insert([
        {
          user_id: 1,
          follower_id: 2
        },
        {
          user_id: 1,
          follower_id: 3
        },
        {
          user_id: 2,
          follower_id: 1
        },
        {
          user_id: 3,
          follower_id: 2
        }
      ]);
    });
};