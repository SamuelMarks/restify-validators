import * as restify from 'restify';
import { JsonSchema, MultiResult } from 'tv4';
import { CustomJsonError } from './interfaces.d';
export declare const has_body: (req: restify.Request, res: restify.Response, next: restify.Next) => void;
export declare const jsonSchemaErrorParser: (body_is: MultiResult) => CustomJsonError | undefined;
export declare const mk_valid_body_mw: (json_schema: JsonSchema, to_res?: boolean) => (request: restify.Request, res: restify.Response, next: restify.Next) => void;
export declare const mk_valid_body_mw_ignore: (json_schema: JsonSchema, ignore: string[]) => (req: restify.Request, res: restify.Response, next: restify.Next) => void;
export declare const jsonSchemaNamedArrayOf: (json_schema: tv4.JsonSchema, type_name?: string | undefined, type_plural?: string | undefined) => tv4.JsonSchema;
export declare const remove_from_body: (keys: string[]) => (request: restify.Request, res: restify.Response, next: restify.Next) => void;
