# koa-jsonapi-controllers

jsonapi controllers for koa.

## Installation

```
yarn add @arfedulov/koa-jsonapi-controllers
```

## Usage

```ts
import Koa, { Context } from 'koa';
// jsonapi error-handling middleware
import { jsonApiErrors } from '@arfedulov/koa-jsonapi-errors';

import {
  BaseController,
  createMainRequestHandler,
  JsonapiContext,
} from '@arfedulov/koa-jsonapi-controllers';

const app = new Koa();

// Each your controller should extend BaseController
class UserController extends BaseController {
  // jsonapi resource type
  name = 'users';

  // overwrite any method you want
  // the default implementation throws NotFound error
  getSingleResource = async (ctx: JsonapiContext) => {
    //
  }
}

class PostController extends BaseController {
  name = 'posts';

  getSingleResource = async (ctx: JsonapiContext) => {
    //
  }
}

const userController = new UserController();
const postController = new PostController();

const requestHandler = createMainRequestHandler([ userController, postController ]);

app.use(jsonApiErrors);
app.use(requestHandler);
```

As this module throws errors, it is recommended to use it with *@arfedulov/koa-jsonapi-errors*
middleware. In this case you'll get automatically generated valid jsonapi error responses.

```ts
app.use(jsonApiErrors);
app.use(requestHandler);
```

Look at `BaseController` source code for the rest of possible request handlers.

You will probably need an access to jsonapi url parameters and url-queries.
Those are exposed on `ctx` argument passed to each request handler. *@arfedulov/json-api-url-parser*
module is used for parsing url into `ctx.[JSON_API_URL_PARAMS_KEY]`. Look the docs for [json-api-url-parser](https://github.com/arfedulov/json-api-url-parser#readme) for the list of available parameters.

```ts
import {
  BaseController,
  createMainRequestHandler,
  JsonapiContext,
  JSON_API_URL_PARAMS_KEY,
} from '@arfedulov/koa-jsonapi-controllers';

class PostController extends BaseController {
  name = 'posts';

  getSingleResource = async (ctx: JsonapiContext) => {
    const jsonapiParams = ctx[JSON_API_URL_PARAMS_KEY];
    // ......
  }
}
