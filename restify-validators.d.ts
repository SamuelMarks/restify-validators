/* tslint:disable:no-reference-import */
/// <reference types="tv4" />
import * as restify from 'restify';
import { JsonSchema } from 'tv4';

export declare const has_body: (req: restify.Request, res: restify.Response, next: restify.Next) => any;
export declare const mk_valid_body_mw: (json_schema: JsonSchema, to_res?: boolean) =>
    (req: restify.Request, res: restify.Response, next: restify.Next) => any;
export declare const mk_valid_body_mw_ignore: (json_schema: JsonSchema, ignore: string[]) =>
    (req: restify.Request, res: restify.Response, next: restify.Next) => any;
export declare const remove_from_body: (keys: string[]) =>
    (req: restify.Request, res: restify.Response, next: restify.Next) => any;
