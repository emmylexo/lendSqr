
import { InvalidTokenError, TokenExpiredError, decodeJwt, errorMessage } from 'iyasunday';
import { getRedis } from './redis';

export const guard = async (req, res, next) => {
        try {
            let token = req.headers.authorization;
            if (!token) throw new InvalidTokenError("Kindly provide valid authentication token")
            token = token.split(' ').pop();

            const { tokenRef = undefined } = await decodeJwt(token);
            if (!tokenRef) throw new InvalidTokenError('Supplied token not valid');
            const user = await getRedis(tokenRef, true);
            if (!user) throw new TokenExpiredError('Session expired');

            req.user = user;
            return next();
        } catch (err) {
            return res
                .status(err.httpStatusCode || 500)
                .json(errorMessage(err));
        }
}

