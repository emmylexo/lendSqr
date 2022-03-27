import * as services from './services';


export async function topUp(req, res, next) {
    try {
        res.status(200).json(await services.topUp(req.user.id, req.body));
    } catch (err) {
        next(err);
    }
}

export async function transfer(req, res, next) {
    try {
        res.status(200).json(await services.transfer(req.user.id, req.body));
    } catch (err) {
        next(err);
    }
}

export async function withdraw(req, res, next) {
    try {
        res.status(200).json(await services.withdraw(req.user.id, req.body));
    } catch (err) {
        next(err);
    }
}