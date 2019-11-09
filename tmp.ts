import { BaseController, createMainRequestHandler, JsonapiContext, JSON_API_URL_PARAMS_KEY } from './src';
import Koa, { Context } from 'koa';
import { jsonApiErrors } from '@arfedulov/koa-jsonapi-errors';

const app = new Koa();

class A extends BaseController {
  name = 'a';

  getSingleResource = async (ctx: JsonapiContext) => {
    ctx.body = 'hello world';
  }
}

class B extends BaseController {
  name = 'b';
}

const a = new A();
const b = new B();

const mainController = createMainRequestHandler([a, b]);

app.use(jsonApiErrors);
app.use(mainController);

app.listen(8080, () => console.log('listening'))
