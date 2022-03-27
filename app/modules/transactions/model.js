'use strict'

import knex, { uuid } from '../../utils/db';
import Model from '../../utils/model';

const tableName = 'transaction_logs';

const selectableProps = [
    'id',
    'userId',
    'balance',
    'amount',
    'type',
    'narration',
    'created_at',
    'updated_at'
];

const beforeSave = (data) => {
    data.id = uuid.toBinary();

    return {
        ...data
    }
}

class TransactionLog extends Model {
    constructor(tableName, selectableProps) {
        super(tableName, selectableProps);
        this.tableName = tableName;
        this.selectableProps = selectableProps;
    }

    createLog = async ({ data, transaction = null }) => {
        data = beforeSave(data);
        return await this.create({ data, transaction })
    }
}

export default new TransactionLog(tableName, selectableProps);