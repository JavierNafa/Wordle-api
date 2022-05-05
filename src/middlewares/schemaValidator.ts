import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import * as schemas from '../schemas/index';
import { StatusResponseError } from '../models/statusResponseError';

export default (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const url = req.baseUrl;
    const path = req.route.path;
    const query = req.query;
    const params = req.params;
    const body = req.body;
    const schema = _.get(schemas.indexSchema, url);
    if (schema) {
        const validator = _.get(schema, `${method}${url}${path}`);
        if (validator) {
            const { error } = validator.validate({ ...body, ...params, ...query });
            if (error) {
                return next(error);
            }
            return next();
        }
    }
    return next(new StatusResponseError(404, `This route doesn't exist`));
}