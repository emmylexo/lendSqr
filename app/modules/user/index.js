import { Router } from 'express';
import { joiValidator } from 'iyasunday';
import * as controller from './controller';
import validation from './validation';

const route = Router();

route.post(
    "/register",
    joiValidator(validation.create),
    controller.create
);

route.post(
    "/login",
    joiValidator(validation.login),
    controller.login
)

route.delete(
    "/user/:id",
    joiValidator(validation.remove),
    controller.remove
)



export default route;