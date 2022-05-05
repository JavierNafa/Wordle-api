import * as Joi from 'joi';

const postLogin: Joi.ObjectSchema = Joi.object().keys({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(8).required()
});

const postRefresh: Joi.ObjectSchema = Joi.object().keys({
    refreshToken: Joi.string().required()
});

export const authSchema = {
    'POST/auth/login': postLogin,
    'POST/auth/refresh': postRefresh
}