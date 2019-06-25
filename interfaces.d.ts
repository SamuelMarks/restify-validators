import { ErrorVar } from 'tv4';

export interface IErrorMsg {
    error: string;
    error_message: string;
}

export type CustomJsonError = IErrorMsg
    | IErrorMsg & {error_metadata: {}}
    | IErrorMsg & {error_metadata: {}} & ErrorVar;
