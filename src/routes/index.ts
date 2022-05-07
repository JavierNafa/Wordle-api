import { userRouter } from './user';
import { authRouter } from './auth';
import { roundRouter } from './round';

export const index = {
    user: userRouter(),
    auth: authRouter(),
    round: roundRouter()
}