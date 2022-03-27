import { genSalt, hash, compare, hashSync } from 'bcryptjs';

export async function hashPassword(plainText) {
    try {
        const salt = await genSalt(10);
        return await hash(plainText, salt);
    } catch (err) {
        throw err;
    }
}

export async function comparePassword(plainText, hash) {
    try {
        return await compare(plainText, hash);
    } catch (err) {
        throw err;
    }
}