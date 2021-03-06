import { Request, Response, NextFunction } from 'express';

export function expressCors(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, Authorization`);
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
}