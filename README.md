# @joshuaavalon/fastify-plugin-file-routes

## Getting Started

> This is a ESM only module. You must be using ESM in order to use this.

```sh
npm install @joshuaavalon/fastify-plugin-file-routes
```

```ts
import { URL, fileURLToPath } from "node:url";
import fastify from "fastify";
import fileRoutesPlugin from "@joshuaavalon/fastify-plugin-file-routes";

const routesDir = fileURLToPath(new URL("./routes", import.meta.url));

const app = await fastify();
await app.register(fileRoutesPlugin, { baseDir: routesDir });
```

```ts
import { routes } from "@joshuaavalon/fastify-plugin-file-routes";

export default routes({
  get: {
    opts: {},
    async handler(req, res) {
      const { params } = req;
      res.send(params);
    }
  }
});
```

```
routes/
├─ index.ts
├─ path1.ts
├─ foo/
│  └─ [id].ts
└─ bar/
   └─ [...].ts
```

## Usage

For file, it will resolve to file name, except `index` which resolve to current level. For example,

- `a/b/index.ts` => `/a/b`
- `a/b/c.ts` => `/a/b/c`

For path parameters, it uses `[<name>]`.

- `a/[id]/c.ts` => `/a/:id/c`
- `a/b/[id].ts` => `/a/b/:id`

For wildcard path parameters, it uses `[<name>]`.

- `a/[...]/c.ts` => `/a/*/c`
- `a/b/[...].ts` => `/a/b/*`

Please refer to [Fastify](https://fastify.dev/docs/latest/Reference/Routes/#url-building) for more details on path parameters.

## Options

- `baseDir`: Base directory to search for route files
- `ignore`: Regular expression to ignore directories and files. Default to `/^\.|^_|\.test\.|\.spec\.|__tests__/gu`
- `match`: Regular expression to match route files. Default to `/\.js/gu`
- `prefix`: Prefix for all routes. Default to `/`
