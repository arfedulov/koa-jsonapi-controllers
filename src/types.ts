import { Context } from 'koa';
import { JsonApiUrlParams } from '@arfedulov/json-api-url-parser';

export interface RequestHandlersDict {
  [key: string]: JsonApiRequestHandler;
}

export const JSON_API_URL_PARAMS_KEY = Symbol('jsonapi-url-params');

export interface JsonapiContext extends Context {
  [JSON_API_URL_PARAMS_KEY]: JsonApiUrlParams;
}

export type JsonApiRequestHandler = (ctx: JsonapiContext) => Promise<any>;
