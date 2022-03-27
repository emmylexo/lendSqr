'use strict'

import { hashSync } from 'bcryptjs';
import { uuid } from '../../utils/db';
import Model from '../../utils/model';

const tableName = 'users';

const selectableProps = [
    'id',
    'firstName',
    'lastName',
    'email',
    'password',
    'tokenRef',
    'created_at',
    'updated_at'
];

const hashPassword = (password) => hashSync(password);

const beforeSave = (user) => {
    if (!user.password) return user;

    const password = hashPassword(user.password);
    user.id = uuid.toBinary();

    return {
        ...user,
        password
    }
}


class User extends Model {
    constructor(tableName, selectableProps) {
        super(tableName, selectableProps);
        this.tableName = tableName;
        this.selectableProps = selectableProps;
    }

    createUser = async ({ data, transaction = null }) => {
        data = beforeSave(data);
        return await this.create({ data, transaction })
    }
}

export default new User(tableName, selectableProps);