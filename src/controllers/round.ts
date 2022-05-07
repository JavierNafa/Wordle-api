import { Request, Response, NextFunction } from 'express';
import { startRound, updateRound } from '../services/round';
import { StatusResponseError } from '../models/statusResponseError';

export async function postStart(req: Request, res: Response, next: NextFunction) {
    try {
        const { userUuid } = res.locals;
        const generatedTokens = await startRound(userUuid);
        return res.status(201).send({ success: true, data: generatedTokens, message: 'OK' });
    }
    catch (err) {
        return next(err);
    }
}

export async function putAttempt(req: Request, res: Response, next: NextFunction) {
    try {
        const { userUuid } = res.locals;
        const { uuid } = req.params;
        const { word } = req.body;
        const data = await updateRound(userUuid, uuid, word);
        if (data) {
            return res.status(200).send({ success: true, data, message: 'OK' });
        }
        return next(new StatusResponseError(400, 'That round already end'));
    }
    catch (err) {
        return next(err);
    }
}