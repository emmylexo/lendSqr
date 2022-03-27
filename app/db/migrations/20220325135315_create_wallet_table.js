/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('wallets', (table) => {
        table.binary('id', 16).unique().notNullable().primary();
        table.binary('userId', 255).references('id').inTable('users');
        table.double('balance').defaultTo(0.0);
        table.timestamps(false, true);
        table.index(['id', 'userId'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('wallets');
};
