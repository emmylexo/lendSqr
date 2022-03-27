'use strict';

import { AuthenticationError, encodeJwt, ExistsError } from "iyasunday"
import knex, { uuid } from "../../utils/db"
import { delRedis, setRedis } from "../../utils/redis";
import User from './model';
import Wallet from '../wallet/model';
import Transaction from '../transactions/model';
import { comparePassword } from "../../utils";

async function setAuth(currentUser, transaction) {
    try {

        const user = currentUser;
        delete user.password;
        user.id = uuid.toString(user.id);
        if (user.tokenRef) await delRedis(user.tokenRef);
        const tokenRef = uuid.get();
        user.tokenRef = tokenRef;
        await setRedis(tokenRef, user);
        user.token = await encodeJwt({
            data: { tokenRef, createdAt: new Date() },
            secreteKey: process.env.APP_KEY,
            duration: process.env.JWT_TOKEN_VALIDITY,
        });

        await User.update({
            id: uuid.toBinary(user.id),
            data: { tokenRef },
            transaction
        });

        transaction.commit()
        return user;
    } catch (err) {
        throw err;
    }
}

export const create = async (body) => {

    const transaction = await knex.transaction();

    let user = await User.findOne({ filters: { email: body.email }, transaction })

    if (user) throw new ExistsError(`A user with this account already exists`);

    try {
        await User.createUser({ data: body, transaction });
        user = await User.findOne({ filters: { email: body.email }, transaction });

        await Wallet.createWallet({
            data: { userId: user.id },
            transaction
        });

        return {
            success: true,
            message: `User created successfully`,
            data: await setAuth(user, transaction)
        }
    } catch (error) {
        transaction.rollback();
        throw error;
    }
}

export const login = async (body) => {
    const transaction = await knex.transaction();
    try {
        const { email, password } = body;

        const user = await User.findOne({ filters: { email }, transaction });

        if (!user)
            throw new AuthenticationError(
                `We couldn't find an account matching the login info you entered, Please check your login credentials or create a new account`
            );


        if (!(await comparePassword(password, user.password)))
            throw new AuthenticationError("The password that you've entered is incorrect");

        return {
            success: true,
            data: await setAuth(user, transaction),
        };
    } catch (err) {
        throw err;
    }
}

export const remove = async (id) => {
    const transaction = await knex.transaction();
    try {

        const user = await User.findById({ id: uuid.toBinary(id), transaction });

        if (!user)
            throw new AuthenticationError(
                `User not found`
            );

        // DELETE ALL USER'S DATA 
        const userWallet = await Wallet.findOne({ filters: { userId: uuid.toBinary(id) }, transaction });
        await Wallet.destroy({ filters: { id: uuid.toBinary(userWallet.id) }, transaction });
        await Transaction.destroy({ filters: { userId: uuid.toBinary(id) }, transaction });
        await User.destroy({ filters: { id: uuid.toBinary(id) }, transaction });

        transaction.commit();
        return {
            success: true,
            message: `User deleted successfully`
        };
    } catch (err) {
        transaction.rollback();
        throw err;
    }
}