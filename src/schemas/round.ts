import * as Joi from 'joi';

const putAttempt: Joi.ObjectSchema = Joi.object().keys({
    uuid: Joi.string().uuid().required(),
    word: Joi.string().length(5).uppercase().required()
});

export const roundSchema = {
    'PUT/rounds/attempts/:uuid': putAttempt
}