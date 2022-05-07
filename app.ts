import express, { Express, urlencoded, json, Request, Response } from 'express';
import { expressCors } from './src/middlewares/cors';
import { index } from './src/routes/index';
import errorHandler from './src/middlewares/errorHandler';
import { checkToken } from './src/middlewares/security';


export default () => {

    const app: Express = express();

    app.use(expressCors);
    app.use(urlencoded({
        limit: '10mb',
        extended: true
    }));
    app.use(json({
        limit: '5mb'
    }));
    app.get('/', (req: Request, res: Response) => { return res.send("hello world") });
    app.use('/users', index.user);
    app.use('/auth', index.auth);
    app.use('*', checkToken);
    app.use('/rounds', index.round);
    app.use('/stats', index.stats);

    app.use(errorHandler);
    return app;
}