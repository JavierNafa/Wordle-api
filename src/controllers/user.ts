import { Response, Request, NextFunction } from 'express';
import { register } from '../services/user';
import { IUser } from '../models/user';
import { StatusResponseError } from '../models/statusResponseError';

export async function postRegister(req: Request, res: Response, next: NextFunction) {
    try {
        const user: IUser = req.body;
        const result = await register(user);
        if (result) {
            return res.status(201).send({ success: true, data: result, message: 'OK' });
        }
        return res.status(400).send({ success: false, data: null, message: 'This username already exists' });

    } catch (err) {
        return next(new StatusResponseError(400, err.message, null));
    }
}