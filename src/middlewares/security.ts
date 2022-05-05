import { Request, Response, NextFunction } from 'express';
import { verifyToken, verifyHash } from '../services/auth';
import { StatusResponseError } from '../models/statusResponseError';

export async function checkHash(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        const { isValid, user } = await verifyHash(username, password);
        if (isValid) {
            res.locals.userUuid = user.uuid;
            return next();
        }
        return next(new StatusResponseError(401, `That's not your password or username`));
    }
    catch (err) {
        return next(err);
    }
}

export async function checkToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const [, token] = authorization.split(' ');
            const userUuid = await verifyToken(token, false);
            if (userUuid) {
                res.locals.userUuid = userUuid;
                return next();
            }
        }
        const isRefreshToken = req.path.includes('/refresh');
        if (isRefreshToken) {
            const { refreshToken } = req.body;
            const userUuid = await verifyToken(refreshToken, true);
            if (userUuid) {
                res.locals.userUuid = userUuid;
                return next();
            }
        }
        return next(new StatusResponseError(403, `You are not who you say you are`));
    }
    catch (err) {
        return next(err);
    }
}