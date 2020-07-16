
exports.up = function (knex) {
    return knex.schema.createTable("private_tasks", function (table) {
        table.increments();
        table.integer("private_list_id").unsigned().notNullable().references("private_lists.id").onDelete("cascade").onUpdate("cascade");
        table.string("text", 255).notNullable();
        table.enum("status", ["in progress", "done", "expired"]).notNullable().defaultTo("in progress");
        table.boolean("favourite").notNullable().defaultTo(false);
        table.datetime("date");
        table.datetime("deadline");
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("private_tasks");
};