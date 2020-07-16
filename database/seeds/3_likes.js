
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        {
          user_id: 2,
          publication_id: 1
        },
        {
          user_id: 3,
          publication_id: 1
        },
        {
          user_id: 2,
          publication_id: 2
        },
        {
          user_id: 3,
          publication_id: 3
        },
        {
          user_id: 2,
          publication_id: 3
        },
        {
          user_id: 3,
          publication_id: 4
        }
      ]);
    });
};
