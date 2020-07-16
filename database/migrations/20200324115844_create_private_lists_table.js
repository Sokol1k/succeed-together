
exports.up = function (knex) {
    return knex.schema.createTable("private_lists", function (table) {
        table.increments();
        table.integer("user_id").unsigned().notNullable().references("users.id").onDelete("cascade").onUpdate("cascade");
        table.string("title", 255).notNullable();
        table.integer('index').notNullable();
        table.boolean("favourite").notNullable().defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("private_lists");
};
