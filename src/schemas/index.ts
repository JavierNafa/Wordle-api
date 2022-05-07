import { userSchema } from './user';
import { authSchema } from './auth';
import { roundSchema } from './round';

export const indexSchema = {
    '/user': userSchema,
    '/auth': authSchema,
    '/rounds': roundSchema
}