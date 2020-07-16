
exports.up = function (knex) {
    return knex.schema.createTable("likes", function (table) {
        table.increments();
        table.integer("user_id").unsigned().notNullable().references("users.id").onDelete("cascade").onUpdate("cascade");
        table.integer("publication_id").unsigned().notNullable().references("publications.id").onDelete("cascade").onUpdate("cascade");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("likes");
};
