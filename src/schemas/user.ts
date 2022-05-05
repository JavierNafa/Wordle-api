import * as Joi from 'joi';

const post: Joi.ObjectSchema = Joi.object().keys({
    firstName: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(8).required()
});

export const userSchema = {
    'POST/user/register': post
}