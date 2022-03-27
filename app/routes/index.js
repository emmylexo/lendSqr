import { errorMessage } from 'iyasunday';
import UserEndpoints from '../modules/user';
import WalletEndpoints from '../modules/wallet';
import TransactionEndpoints from '../modules/transactions';

export default (app) => {
    const apiVersion = '/v1';

    app.use(apiVersion, UserEndpoints);
    app.use(apiVersion, WalletEndpoints);
    app.use(apiVersion, TransactionEndpoints);

    app.use((err, req, res, next) => {
        if (!err) return next();
        res.status(err.httpStatusCode || 500).json(errorMessage(err));
    });

    app.use((req, res, next) => {
        res.status(404).json({
            message: `Requested route ( ${req.get('HOST')}${req.originalUrl} ) not found`,
        });
    });
};
