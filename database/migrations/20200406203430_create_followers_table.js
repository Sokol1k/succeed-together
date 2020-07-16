
exports.up = function(knex) {
    return knex.schema.createTable("followers", function (table) {
        table.increments();
        table.integer("user_id").unsigned().notNullable().references("users.id").onDelete("cascade").onUpdate("cascade");
        table.integer("follower_id").unsigned().notNullable().references("users.id").onDelete("cascade").onUpdate("cascade");
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("followers");
};
