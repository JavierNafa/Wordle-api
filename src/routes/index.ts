import { userRouter } from './user';
import { authRouter } from './auth';

export const index = {
    user: userRouter(),
    auth: authRouter()
}