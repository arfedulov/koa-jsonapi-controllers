import assert from 'assert';
import { Context } from 'koa';

import { createMainRequestHandler } from '../createMainRequestHandler';
import { BaseController } from '../BaseController';

class ControllerMock {
  name: string;
  handlerMock: (ctx: Context) => Promise<void>;

  constructor(name: string, handlerMock: (ctx: Context) => Promise<void>) {
    this.name = name;
    this.handlerMock = handlerMock;
  }

  createRequestHandler = () => {
    return this.handlerMock;
  }
}

test('createMainRequestHandler(): creates async function that calls corresponding handler for each resource type', async () => {
  const handlerMockA = jest.fn(async (ctx: Context) => {});
  const handlerMockB = jest.fn(async (ctx: Context) => {});
  const controllerA: BaseController = new ControllerMock('a', handlerMockA) as any;
  const controllerB: BaseController = new ControllerMock('b', handlerMockB) as any;

  const INPUT_A: Context = {
    url: '/a',
  } as any;

  const INPUT_B: Context = {
    url: '/b',
  } as any;

  const mainHandler = createMainRequestHandler([controllerA, controllerB]);

  await mainHandler(INPUT_A);
  await mainHandler(INPUT_B);

  assert.strictEqual(handlerMockA.mock.calls.length, 1);
  assert.deepStrictEqual(handlerMockA.mock.calls[0][0], INPUT_A);
  assert.strictEqual(handlerMockB.mock.calls.length, 1);
  assert.deepStrictEqual(handlerMockB.mock.calls[0][0], INPUT_B);
});
