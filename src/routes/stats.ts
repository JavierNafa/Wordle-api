import { Router } from 'express';
import { getStatsByUser, getStats } from '../controllers/stats';
import schemaValidator from '../middlewares/schemaValidator';

const router: Router = Router();

export function statsRouter() {

    router.get('/users/:uuid', schemaValidator, getStatsByUser);
    router.get('/users', getStats);
    return router;
}