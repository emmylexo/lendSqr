import { Router } from 'express';
import { joiValidator } from 'iyasunday';
import { guard } from '../../utils/middleware';
import * as controller from './controller';
import validation from './validation';

const route = Router();

route.post(
    "/wallet/topup",
    joiValidator(validation.topUp),
    guard,
    controller.topUp
);

route.post(
    "/wallet/transfer",
    guard,
    joiValidator(validation.transfer),
    controller.transfer
)

route.post(
    "/wallet/withdraw",
    guard,
    joiValidator(validation.withdraw),
    controller.withdraw
)


export default route;