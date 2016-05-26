import * as restify from 'restify';

declare var nodejs_validators: nodejs_validators.nodejs_validators;

declare module nodejs_validators {
    export interface nodejs_validators {
        has_body(req: restify.Request, res: restify.Response, next: restify.Next);
        mk_valid_body_mw(json_schema: tv4.JsonSchema, to_res?: boolean);
        mk_valid_body_mw_ignore(json_schema: tv4.JsonSchema, ignore: Array<string>);
        remove_from_body(keys: Array<string>);
    }
}

export = nodejs_validators;