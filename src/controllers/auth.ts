import { Request, Response, NextFunction } from 'express';
import { generateTokens } from '../services/auth';

export async function postToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { userUuid } = res.locals;
        const generatedTokens = await generateTokens(userUuid);
        return res.status(200).send({ success: true, data: generatedTokens, message: 'OK' });
    }
    catch (err) {
        return next(err);
    }
}