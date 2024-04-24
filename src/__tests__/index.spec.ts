import { URL, fileURLToPath } from "node:url";
import { assert } from "chai";
import fastify from "fastify";
import plugin from "../index.js";

import type { FastifyInstance } from "fastify";

const routesDir = fileURLToPath(new URL("./routes", import.meta.url));

describe("Test plugin", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await fastify();
    await app.register(plugin, { baseDir: routesDir });
  });

  it("should work", async () => {
    const res = await app.inject({ path: "/", method: "get" });
    assert.equal(res.body, "hello world");
  });

  it("should work with params", async () => {
    const res = await app.inject({ path: "/1", method: "get" });
    const json = res.json();
    assert.equal(json.id, "1");
  });

  it("should work with params", async () => {
    const res = await app.inject({ path: "/1/test", method: "get" });
    const json = res.json();
    assert.equal(json.id, "1");
  });

  it("should not found", async () => {
    const res = await app.inject({ path: "/1/__tests__", method: "get" });
    assert.equal(res.statusCode, 404);
  });
});
