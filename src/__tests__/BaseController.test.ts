import assert from 'assert';

import { BaseController } from '../BaseController';
import { JsonapiContext, JSON_API_URL_PARAMS_KEY } from '../types';

const RESOURCE_TYPE = 'abc';
const RESOURCE_ID = '12345';
const RELATIONSHIP_TYPE = 'qwer';

const getCollectionMock = jest.fn(async (ctx: any) => {});
const getSingleResourceMock = jest.fn(async (ctx: any) => {});
const getRelationshipMock = jest.fn(async (ctx: any) => {});

const postCollectionMock = jest.fn(async (ctx: any) => {});
const postSingleResourceMock = jest.fn(async (ctx: any) => {});
const postRelationshipMock = jest.fn(async (ctx: any) => {});

const patchCollectionMock = jest.fn(async (ctx: any) => {});
const patchSingleResourceMock = jest.fn(async (ctx: any) => {});
const patchRelationshipMock = jest.fn(async (ctx: any) => {});

const deleteCollectionMock = jest.fn(async (ctx: any) => {});
const deleteSingleResourceMock = jest.fn(async (ctx: any) => {});
const deleteRelationshipMock = jest.fn(async (ctx: any) => {});

class Controller extends BaseController {
  name = RESOURCE_TYPE;

  getCollection = getCollectionMock;
  getSingleResource = getSingleResourceMock;
  getRelationship = getRelationshipMock;

  postCollection = postCollectionMock;
  postSingleResource = postSingleResourceMock;
  postRelationship = postRelationshipMock;

  patchCollection = patchCollectionMock;
  patchSingleResource = patchSingleResourceMock;
  patchRelationship = patchRelationshipMock;

  deleteCollection = deleteCollectionMock;
  deleteSingleResource = deleteSingleResourceMock;
  deleteRelationship = deleteRelationshipMock;
}
const requestHandler = new Controller().createRequestHandler();

test('delegates request to getCollection() method', async () => {

  const CTX: JsonapiContext = {
    method: 'GET',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(getCollectionMock.mock.calls.length, 1);
  assert.deepStrictEqual(getCollectionMock.mock.calls[0][0], CTX);
});

test('delegates request to getSingleResource() method', async () => {

  const CTX: JsonapiContext = {
    method: 'GET',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(getSingleResourceMock.mock.calls.length, 1);
  assert.deepStrictEqual(getSingleResourceMock.mock.calls[0][0], CTX);
});

test('delegates request to getRelationship() method', async () => {

  const CTX: JsonapiContext = {
    method: 'GET',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
      relationshipType: RELATIONSHIP_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(getRelationshipMock.mock.calls.length, 1);
  assert.deepStrictEqual(getRelationshipMock.mock.calls[0][0], CTX);
});

test('delegates request to postCollection() method', async () => {

  const CTX: JsonapiContext = {
    method: 'POST',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(postCollectionMock.mock.calls.length, 1);
  assert.deepStrictEqual(postCollectionMock.mock.calls[0][0], CTX);
});

test('delegates request to postSingleResource() method', async () => {

  const CTX: JsonapiContext = {
    method: 'POST',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(postSingleResourceMock.mock.calls.length, 1);
  assert.deepStrictEqual(postSingleResourceMock.mock.calls[0][0], CTX);
});

test('delegates request to postRelationship() method', async () => {

  const CTX: JsonapiContext = {
    method: 'POST',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
      relationshipType: RELATIONSHIP_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(postRelationshipMock.mock.calls.length, 1);
  assert.deepStrictEqual(postRelationshipMock.mock.calls[0][0], CTX);
});

test('delegates request to patchCollection() method', async () => {

  const CTX: JsonapiContext = {
    method: 'PATCH',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(patchCollectionMock.mock.calls.length, 1);
  assert.deepStrictEqual(patchCollectionMock.mock.calls[0][0], CTX);
});

test('delegates request to patchSingleResource() method', async () => {

  const CTX: JsonapiContext = {
    method: 'PATCH',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(patchSingleResourceMock.mock.calls.length, 1);
  assert.deepStrictEqual(patchSingleResourceMock.mock.calls[0][0], CTX);
});

test('delegates request to patchRelationship() method', async () => {

  const CTX: JsonapiContext = {
    method: 'PATCH',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
      relationshipType: RELATIONSHIP_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(patchRelationshipMock.mock.calls.length, 1);
  assert.deepStrictEqual(patchRelationshipMock.mock.calls[0][0], CTX);
});

test('delegates request to deleteCollection() method', async () => {

  const CTX: JsonapiContext = {
    method: 'DELETE',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(deleteCollectionMock.mock.calls.length, 1);
  assert.deepStrictEqual(deleteCollectionMock.mock.calls[0][0], CTX);
});

test('delegates request to deleteSingleResource() method', async () => {

  const CTX: JsonapiContext = {
    method: 'DELETE',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(deleteSingleResourceMock.mock.calls.length, 1);
  assert.deepStrictEqual(deleteSingleResourceMock.mock.calls[0][0], CTX);
});

test('delegates request to deleteRelationship() method', async () => {

  const CTX: JsonapiContext = {
    method: 'DELETE',
    [JSON_API_URL_PARAMS_KEY]: {
      resourceId: RESOURCE_ID,
      resourceType: RESOURCE_TYPE,
      relationshipType: RELATIONSHIP_TYPE,
    },
  } as any;

  await requestHandler(CTX);

  assert.strictEqual(deleteRelationshipMock.mock.calls.length, 1);
  assert.deepStrictEqual(deleteRelationshipMock.mock.calls[0][0], CTX);
});
