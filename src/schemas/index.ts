import { userSchema } from './user';
import { authSchema } from './auth';
import { roundSchema } from './round';
import { statsSchema } from './stats';

export const indexSchema = {
    '/users': userSchema,
    '/auth': authSchema,
    '/rounds': roundSchema,
    '/stats': statsSchema
}