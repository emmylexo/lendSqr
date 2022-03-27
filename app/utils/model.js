'use strict'
import knex from './db';

class Model {
    constructor(tableName = 'tableName', selectableProps = [], timeout = 1000) {
        this.tableName = tableName;
        this.selectableProps = selectableProps;
        this.timeout = timeout;
    }

    create = async ({ data, transaction = null }) => {

        return await knex(this.tableName).transacting(transaction).insert(data)
            .timeout(this.timeout);
    }

    findAll = ({ transaction = null }) => knex.transacting(transaction).select(selectableProps)
        .from(tableName)
        .timeout(timeout)

    find = ({ filters, transaction = null }) => {
        return knex(this.tableName).transacting(transaction).select()
            .where(filters)
            .timeout(this.timeout)
    }

    // Same as `find` but only returns the first match if >1 are found.
    findOne = async ({ filters, transaction = null }) => {
        const response = await knex(this.tableName).transacting(transaction).select()
            .where(filters)
            .limit(1)
            .timeout(this.timeout);

        if (response && response.length > 0) return response[0];
        return null;
    }

    findById = async ({ id, transaction = null }) => {
        return await knex(this.tableName).transacting(transaction).select(this.selectableProps)
            .where({ id })
            .timeout(this.timeout)
    }

    update = async ({ id, data, transaction = null }) => {
        delete data.id // not allowed to set `id`

        return await knex(this.tableName).transacting(transaction).update(data)
            .where({ id })
            .timeout(this.timeout)
    }

    destroy = async ({ filters, transaction = null }) => {
        return await knex(this.tableName).transacting(transaction).del()
            .where(filters)
            .timeout(this.timeout)
    }
}

export default Model;