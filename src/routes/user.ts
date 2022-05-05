import { Router } from 'express';
import { postRegister } from '../controllers/user';
import schemaValidator from '../middlewares/schemaValidator';

const router: Router = Router();

export function userRouter() {

    router.post('/register', schemaValidator, postRegister);
    return router;
}