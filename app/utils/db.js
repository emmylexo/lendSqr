"use strict";
import { v1 as uuidV1, validate as UUIDValidaton } from "uuid";

const knexConfig = require('../db/knexfile')

const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

export const uuid = {
    toBinary: (uuid) => {
        if (!uuid) uuid = uuidV1();
        else if (typeof uuid !== "string" && Buffer.isBuffer(uuid)) return uuid;
        const buf = Buffer.from(uuid.replace(/-/g, ""), "hex");
        return Buffer.concat([
            buf.slice(6, 8),
            buf.slice(4, 6),
            buf.slice(0, 4),
            buf.slice(8, 16),
        ]);
    },
    toString: (binary) => {
        if (!binary) throw new Error("Kindly supply binary UUID value");
        if (typeof binary === "string") return binary;
        return [
            binary.toString("hex", 4, 8),
            binary.toString("hex", 2, 4),
            binary.toString("hex", 0, 2),
            binary.toString("hex", 8, 10),
            binary.toString("hex", 10, 16),
        ].join("-");
    },
    mysqlBinary: (value) => knex.fn.uuidToBin(value),
    mysqlUUID: (value) => knex.fn.binToUuid(value),
    get: () => uuidV1(),
    isValid: (uuid) => UUIDValidaton(uuid),
    manyToString: (data, keys = []) => {
        if (!data) return;
        keys.forEach((key) => {
            if (data[key]) data[key] = uuid.toString(data[key]);
        });
        return data;
    },
    manyToBinary: (data, keys = []) => {
        if (!data) return;
        keys.forEach((key) => {
            if (data[key]) data[key] = uuid.toBinary(data[key]);
        });
        return data;
    },
};

export default knex;