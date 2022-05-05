import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { JsonWebTokenError } from 'jsonwebtoken';
import { StatusResponseError } from '../models/statusResponseError';
import { TypeORMError } from 'typeorm';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof StatusResponseError) {
        return res.status(err.statusCode).send({
            success: false,
            data: err.data,
            message: err.message
        });
    }
    if (err instanceof ValidationError) {
        return res.status(400).send({
            success: false,
            data: null,
            message: `Invalid values, pls don't try to hack this: ${err.details[0].message}`
        });
    }
    if (err instanceof JsonWebTokenError) {
        return res.status(403).send({
            success: false,
            data: null,
            message: `You are not who you say you are`
        });
    }
    if (err instanceof TypeORMError) {
        return res.status(400).send({
            success: false,
            data: null,
            message: ` You killed the DB: ${err.message}.`
        });
    }
    return res.status(500).send({
        success: false,
        data: null,
        message: `This should not happen: ${err.message}`
    });
}