import * as Joi from 'joi';

const getStatsByUser: Joi.ObjectSchema = Joi.object().keys({
    uuid: Joi.string().uuid().required()
});

const pagination = Joi.object().keys({
    page: Joi.number().integer().min(0).optional(),
    limit: Joi.number().integer().min(0).optional()
});

export const statsSchema = {
    'GET/stats/users/:uuid': getStatsByUser,
    'GET/stats/users': pagination,
    'GET/stats/words': pagination,
}