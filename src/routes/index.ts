import { userRouter } from './user';
import { authRouter } from './auth';
import { roundRouter } from './round';
import { statsRouter } from './stats';

export const index = {
    user: userRouter(),
    auth: authRouter(),
    round: roundRouter(),
    stats: statsRouter()
}