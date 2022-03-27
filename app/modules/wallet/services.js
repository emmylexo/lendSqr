import { NotFoundError, PaymentRequiredError } from "iyasunday"
import knex, { uuid } from "../../utils/db"
import Wallet from './model';
import TransactionLog from '../transactions/model';

const debitWallet = async ({ userId, amount, transaction, narration = 'Debit' }) => {
    try {
        if (!userId || !amount) return;

        let wallet = await Wallet.findOne({
            filters: { userId: uuid.toBinary(userId) },
            transaction
        });

        if (!wallet) throw new NotFoundError(`User's wallet not found`);

        if (parseInt(wallet.balance) < parseInt(amount)) throw PaymentRequiredError(`Insufficient Balance`);

        const balance = parseInt(wallet.balance) - parseInt(amount);

        await Wallet.update({
            id: wallet.id,
            data: { balance },
            transaction
        });

        // LOG TRANSACTION
        await TransactionLog.createLog({
            data: {
                userId: uuid.toBinary(userId),
                balance,
                amount,
                type: 'DEBIT',
                narration
            },
            transaction
        })
        return balance;
    } catch (error) {
        throw error;
    }
}

const creditWallet = async ({ userId, amount, transaction, narration = 'CREDIT' }) => {
    try {
        if (!userId || !amount) return;

        let wallet = await Wallet.findOne({
            filters: { userId: uuid.toBinary(userId) },
            transaction
        });

        if (!wallet) throw new NotFoundError(`User's wallet not found`);

        const balance = parseInt(wallet.balance) + parseInt(amount);

        await Wallet.update({
            id: wallet.id,
            data: { balance },
            transaction
        });

        // LOG TRANSACTION
        await TransactionLog.createLog({
            data: {
                userId: uuid.toBinary(userId),
                balance,
                amount,
                type: 'CREDIT',
                narration
            },
            transaction
        })
        return balance;
    } catch (error) {
        throw error;
    }
}

export const topUp = async (userId, body) => {

    const transaction = await knex.transaction();
    try {

        const balance = await creditWallet({ userId, amount: body.amount, transaction, narration: 'Wallet Topup' });

        transaction.commit();

        return {
            success: true,
            message: `Wallet funded successfully`,
            data: {
                balance
            }
        }
    } catch (error) {
        transaction.rollback();
        throw error;
    }
}

export const transfer = async (userId, body) => {
    const transaction = await knex.transaction();

    try {

        const senderBalance = await debitWallet({ userId, amount: body.amount, transaction, narration: 'Funds transfer to user' });

        const receiverBalance = await creditWallet({ userId: body.receiver, amount: body.amount, transaction, narration: 'Funds transfer from user' });

        transaction.commit();

        return {
            success: true,
            message: `Funds transfer successful`
        }
    } catch (error) {
        transaction.rollback();
        throw error;
    }
}

export const withdraw = async (userId, body) => {
    const transaction = await knex.transaction();

    try {

        const balance = await debitWallet({ userId, amount: body.amount, transaction, narration: 'Withdrawal' });

        transaction.commit();

        return {
            success: true,
            message: `Withdraw successful`,
            data: {
                balance
            }
        }
    } catch (error) {
        transaction.rollback();
        throw error;
    }
}