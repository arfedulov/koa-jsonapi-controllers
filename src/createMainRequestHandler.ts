import { Context } from 'koa';
import { parse as parseUrl, JsonApiUrlParams } from '@arfedulov/json-api-url-parser';
import { NotFound, BadRequest } from '@arfedulov/koa-jsonapi-errors';

import { BaseController } from './BaseController';
import { RequestHandlersDict, JsonapiContext, JSON_API_URL_PARAMS_KEY } from './types';

export const createMainRequestHandler = (controllers: BaseController[]) => {
  const requestHandlers = controllers.reduce((acc, controller) => {
    if (!acc[controller.name]) {
      acc[controller.name] = controller.createRequestHandler();
    }
    return acc;
  }, {} as RequestHandlersDict);
  return async (ctx: Context) => {
    let urlParams!: JsonApiUrlParams;
    try {
      urlParams = parseUrl(ctx.url);
    } catch (err) {
      if ((err + '').includes('is not json:api url')) {
        throw new NotFound();
      }
    }
    const { resourceType } = urlParams;
    const handler = requestHandlers[resourceType];
    if (!handler) {
      throw new NotFound();
    }
    const jsonapiCtx = ctx as JsonapiContext;
    jsonapiCtx[JSON_API_URL_PARAMS_KEY] = urlParams;
    await handler(jsonapiCtx);
  };
};
