import { NotFound } from '@arfedulov/koa-jsonapi-errors';

import { JsonApiRequestHandler, JsonapiContext, JSON_API_URL_PARAMS_KEY } from './types';

export interface CreateRequestHandlerParams {
  getCollection: JsonApiRequestHandler;
  getSingleResource: JsonApiRequestHandler;
  getRelationship: JsonApiRequestHandler;

  postCollection: JsonApiRequestHandler;
  postSingleResource: JsonApiRequestHandler;
  postRelationship: JsonApiRequestHandler;

  patchCollection: JsonApiRequestHandler;
  patchSingleResource: JsonApiRequestHandler;
  patchRelationship: JsonApiRequestHandler;

  deleteCollection: JsonApiRequestHandler;
  deleteSingleResource: JsonApiRequestHandler;
  deleteRelationship: JsonApiRequestHandler;
}

const createRequestHandler = (
  params: CreateRequestHandlerParams
): JsonApiRequestHandler => {
  const {
    getCollection,
    getSingleResource,
    getRelationship,

    postCollection,
    postSingleResource,
    postRelationship,

    patchCollection,
    patchSingleResource,
    patchRelationship,

    deleteCollection,
    deleteSingleResource,
    deleteRelationship,
  } = params;

  return async (ctx) => {
    const {
      resourceId,
      relationshipType,
    } = ctx[JSON_API_URL_PARAMS_KEY];

    switch (ctx.method) {
      case 'GET': {
        if (relationshipType) {
          await getRelationship(ctx);
        } else if (resourceId) {
          await getSingleResource(ctx);
        } else {
          await getCollection(ctx);
        }
        break;
      }
      case 'POST': {
        if (relationshipType) {
          await postRelationship(ctx);
        } else if (resourceId) {
          await postSingleResource(ctx);
        } else {
          await postCollection(ctx);
        }
        break;
      }
      case 'PATCH': {
        if (relationshipType) {
          await patchRelationship(ctx);
        } else if (resourceId) {
          await patchSingleResource(ctx);
        } else {
          await patchCollection(ctx);
        }
        break;
      }
      case 'DELETE': {
        if (relationshipType) {
          await deleteRelationship(ctx);
        } else if (resourceId) {
          await deleteSingleResource(ctx);
        } else {
          await deleteCollection(ctx);
        }
        break;
      }
      default:
        break;
    }
  };
};

export abstract class BaseController {
  abstract readonly name: string;

  createRequestHandler = () => createRequestHandler({
    getCollection: this.getCollection,
    getSingleResource: this.getSingleResource,
    getRelationship: this.getRelationship,

    postCollection: this.postCollection,
    postSingleResource: this.postSingleResource,
    postRelationship: this.postRelationship,

    patchCollection: this.patchCollection,
    patchSingleResource: this.patchSingleResource,
    patchRelationship: this.patchRelationship,

    deleteCollection: this.deleteCollection,
    deleteSingleResource: this.deleteSingleResource,
    deleteRelationship: this.deleteRelationship,
  })

  protected getCollection = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected getSingleResource = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected getRelationship = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected postCollection = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected postSingleResource = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected postRelationship = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected patchCollection = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected patchSingleResource = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected patchRelationship = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected deleteCollection = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected deleteSingleResource = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }

  protected deleteRelationship = async (ctx: JsonapiContext): Promise<any> => {
    throw new NotFound();
  }
}
