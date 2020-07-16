exports.up = function (knex) {
    return knex.schema.createTable("publications", function (table) {
        table.increments();
        table.integer("user_id").unsigned().notNullable().references("users.id").onDelete("cascade").onUpdate("cascade");
        table.string("title", 255).notNullable();
        table.string("description", 1024).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("publications");
};
