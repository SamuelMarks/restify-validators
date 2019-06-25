import * as restify from 'restify';
import { ErrorVar, JsonSchema, MultiResult } from 'tv4';
export declare const has_body: (req: restify.Request, res: restify.Response, next: restify.Next) => void;
export declare const jsonSchemaErrorParser: (body_is: MultiResult) => import("./interfaces").IErrorMsg | (import("./interfaces").IErrorMsg & {
    error_metadata: {};
}) | (import("./interfaces").IErrorMsg & {
    error_metadata: {};
} & ErrorVar) | undefined;
export declare const mk_valid_body_mw: (json_schema: JsonSchema, to_res?: boolean) => (req: restify.Request, res: restify.Response, next: restify.Next) => void;
export declare const mk_valid_body_mw_ignore: (json_schema: JsonSchema, ignore: string[]) => (req: restify.Request, res: restify.Response, next: restify.Next) => void;
export declare const jsonSchemaNamedArrayOf: (json_schema: JsonSchema, type_name?: string | undefined, type_plural?: string | undefined) => JsonSchema;
export declare const remove_from_body: (keys: string[]) => (req: restify.Request, res: restify.Response, next: restify.Next) => void;
