import { userSchema } from './user';
import { authSchema } from './auth';

export const indexSchema = {
    '/user': userSchema,
    '/auth': authSchema
}