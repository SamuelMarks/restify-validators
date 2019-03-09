import { GenericError } from 'custom-restify-errors';
import * as restify from 'restify';
import { ErrorVar, JsonSchema, MultiResult, validateMultiple as tv4_validateMultiple } from 'tv4';
import { CustomJsonError } from 'restify-validators';
import { toSentenceCase } from 'nodejs-utils';

export const has_body = (req: restify.Request, res: restify.Response, next: restify.Next) =>
    next(req.body == null ? new GenericError({
        name: 'ValidationError',
        message: 'Body required',
        statusCode: 400
    }) : void 0);

export const jsonSchemaErrorParser = (body_is: MultiResult): CustomJsonError =>
    body_is.valid ? void 0 : body_is.errors.length === 1 ? {
        error: 'ValidationError',
        error_message: body_is.errors[0].message
    } : {
        error: 'ValidationError',
        error_message: 'JSON-Schema validation failed',
        error_metadata: {
            cls: 'tv4',
            errors: body_is['errors'].map((error: ErrorVar) =>
                Object.assign({
                    code: error.code,
                    dataPath: error.dataPath,
                    message: error.message,
                    params: error.params,
                    schemaPath: error.schemaPath,
                    subErrors: error.subErrors
                }, process.env['DEBUG_LEVEL'] && parseInt(process.env['DEBUG_LEVEL'], 10) > 2 ?
                    { stack: error.stack } : {})
            ),
            missing: body_is.missing,
            valid: body_is.valid
        }
    };

export const mk_valid_body_mw = (json_schema: JsonSchema, to_res = true) =>
    /*valid_body*/ (req: restify.Request, res: restify.Response, next: restify.Next) => {
    const body_is = tv4_validateMultiple(req.body, json_schema);
    if (!body_is.valid)
        (error => to_res ? res.json(400, error) && next(false) : req['json_schema_error'] = error)(
            jsonSchemaErrorParser(body_is)
        );
    else return next();
};

export const mk_valid_body_mw_ignore = (json_schema: JsonSchema, ignore: string[]) => {
    return function valid_body(req: restify.Request, res: restify.Response, next: restify.Next) {
        if (!req['json_schema_error']) return next();
        ignore.map(filter => {
                switch (true) {
                    case req['json_schema_error'].error_message.substr(0, filter.length) === filter:
                        req['json_schema_error'].delete_me = true;
                        break;
                    case req['json_schema_error'].error_message === 'JSON-Schema validation failed':
                        req['json_schema_error'].error_metadata.errors =
                            req['json_schema_error'].error_metadata.errors.filter(error =>
                                error.message.substr(0, filter.length) !== filter
                            );
                        break;
                    default: /* tslint:disable:no-console */
                        console.warn('Unknown dataset received instead of json_schema_error');
                }
            }
        );
        if (req['json_schema_error'].delete_me
            || req['json_schema_error'].error_metadata
            && !req['json_schema_error'].error_metadata.errors.length)
            delete req['json_schema_error'];

        return next();
    };
};

export const jsonSchemaNamedArrayOf = (json_schema: tv4.JsonSchema, type_name?: string, type_plural?: string): tv4.JsonSchema => {
    type_name = type_name || json_schema.title.toString();
    const upper_of_type = toSentenceCase(type_name);
    const upper_of_types = toSentenceCase(type_plural || `${type_name}s`);
    const lower_types = upper_of_types.toLocaleLowerCase();
    return {
        $schema: 'http://json-schema.org/draft-06/schema#',
        $ref: `#/definitions/${upper_of_types}`,
        definitions: {
            [upper_of_types]: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    [lower_types]: {
                        type: 'array',
                        items: {
                            $ref: `#/definitions/${upper_of_type}`
                        }
                    }
                },
                required: [
                    lower_types
                ],
                title: lower_types
            },
            [upper_of_type]: json_schema
        }
    };
};

export const remove_from_body = (keys: string[]) =>
    (req: restify.Request, res: restify.Response, next: restify.Next) => {
        keys.map(key => req.body && req.body[key] ? delete req.body[key] : null);
        return next();
    };
