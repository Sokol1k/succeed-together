exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.enu("role", ["admin", "user"]).notNullable();
    table.string("password", 255).notNullable();
    table.string("photo", 255);
    table.string("about", 1024);
    table.timestamps(true, true);

    table.unique("name");
    table.unique("email");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
