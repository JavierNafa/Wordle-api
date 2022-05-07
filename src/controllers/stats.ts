import { Response, Request, NextFunction } from 'express';
import { getStatsByUserUuid, getGlobalStats } from '../services/stats';
import { StatusResponseError } from '../models/statusResponseError';

export async function getStatsByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userUuid } = res.locals;
        const result = await getStatsByUserUuid(userUuid);
        if (result) {
            return res.status(200).send({ success: true, data: result, message: 'OK' });
        }
        return next(new StatusResponseError(400, 'Username already exist, are you trying to hack someone?'));

    } catch (err) {
        return next(new StatusResponseError(400, err.message, null));
    }
}

export async function getStats(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, limit } = req.query;
        const p = page ? parseInt(page as string) : 0;
        const l = limit ? parseInt(limit as string) : 10;
        const result = await getGlobalStats(p, l);
        if (result) {
            return res.status(200).send({ success: true, data: result, message: 'OK' });
        }
        return next(new StatusResponseError(400, 'Username already exist, are you trying to hack someone?'));

    } catch (err) {
        return next(new StatusResponseError(400, err.message, null));
    }
}