'use strict'

import { uuid } from '../../utils/db';
import Model from '../../utils/model';

const tableName = 'wallets';

const selectableProps = [
    'id',
    'userId',
    'balance',
    'created_at',
    'updated_at'
];

const beforeSave = (data) => {
    data.id = uuid.toBinary();

    return {
        ...data
    }
}

class Wallet extends Model {
    constructor(tableName, selectableProps) {
        super(tableName, selectableProps);
        this.tableName = tableName;
        this.selectableProps = selectableProps;
    }

    createWallet = async ({ data, transaction = null }) => {
        data = beforeSave(data);
        return await this.create({ data, transaction })
    }
}

export default new Wallet(tableName, selectableProps);