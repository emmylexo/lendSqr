/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('transaction_logs', (table) => {
        table.binary('id', 16).unique().notNullable().primary();
        table.binary('userId', 255).references('id').inTable('users');
        table.double('balance').defaultTo(0.0);
        table.double('amount').defaultTo(0.0);
        table.enum('type', ['CREDIT', 'DEBIT']).defaultTo('DEBIT');
        table.string('narration', 255).defaultTo('Debit');
        table.timestamps(false, true);
        table.index(['id', 'userId'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('transaction_logs');
};
