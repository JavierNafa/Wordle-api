import { Router } from 'express';
import { getStatsByUser, getStats, getAcurrateWords } from '../controllers/stats';
import schemaValidator from '../middlewares/schemaValidator';

const router: Router = Router();

export function statsRouter() {

    router.get('/users/:uuid', schemaValidator, getStatsByUser);
    router.get('/users', schemaValidator, getStats);
    router.get('/words', schemaValidator, getAcurrateWords);
    return router;
}