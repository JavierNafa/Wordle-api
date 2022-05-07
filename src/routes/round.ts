import { Router } from 'express';
import { postStart, putAttempt } from '../controllers/round';
import schemaValidator from '../middlewares/schemaValidator';

const router: Router = Router();

export function roundRouter() {

    router.post('/start', postStart);
    router.put('/attempts/:uuid', schemaValidator, putAttempt);
    return router;
}