import * as services from './services';


export async function create(req, res, next) {
    try {
        res.status(200).json(await services.create(req.body));
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        res.status(200).json(await services.login(req.body));
    } catch (err) {
        next(err);
    }
}

export async function remove(req, res, next) {
    try {
        res.status(200).json(await services.remove(req.params.id));
    } catch (err) {
        next(err);
    }
}