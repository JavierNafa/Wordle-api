import { Router } from 'express';
import { post } from '../controllers/user';
import schemaValidator from '../middlewares/schemaValidator';

const router: Router = Router();

export function userRouter() {

    router.post('/register', schemaValidator, post);
    return router;
}