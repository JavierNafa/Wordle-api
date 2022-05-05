import { Router } from 'express';
import { postToken } from '../controllers/auth';
import schemaValidator from '../middlewares/schemaValidator';
import { checkToken, checkHash } from '../middlewares/security';

const router: Router = Router();

export function authRouter() {

    router.post('/login', schemaValidator, checkHash, postToken);
    router.post('/refresh', schemaValidator, checkToken, postToken);
    return router;
}