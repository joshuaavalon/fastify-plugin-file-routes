import { assert } from "chai";
import { transformPath } from "../transform-path.js";

describe("Test transformPath()", () => {
  it("should transform index", async () => {
    assert.equal(transformPath("/routes", "/routes/index.ts"), "/");
  });

  it("should transform file name", async () => {
    assert.equal(transformPath("/routes", "/routes/test.ts"), "/test");
  });

  it("should transform directories index", async () => {
    assert.equal(transformPath("/routes", "/routes/a/b/c/index.ts"), "/a/b/c");
  });

  it("should transform directories file name", async () => {
    assert.equal(transformPath("/routes", "/routes/a/b/c/test.ts"), "/a/b/c/test");
  });

  it("should transform wildcard param file", async () => {
    assert.equal(transformPath("/routes", "/routes/[...].ts"), "/*");
    assert.equal(transformPath("/routes", "/routes/a/[...].ts"), "/a/*");
  });

  it("should transform wildcard param directory", async () => {
    assert.equal(transformPath("/routes", "/routes/[...]/index.ts"), "/*");
    assert.equal(transformPath("/routes", "/routes/[...]/test.ts"), "/*/test");
  });

  it("should transform param file", async () => {
    assert.equal(transformPath("/routes", "/routes/[id].ts"), "/:id");
    assert.equal(transformPath("/routes", "/routes/a/[id].ts"), "/a/:id");
    assert.equal(transformPath("/routes", "/routes/a/[id] - [id2].ts"), "/a/:id - :id2");
  });

  it("should transform param directory", async () => {
    assert.equal(transformPath("/routes", "/routes/[id]/index.ts"), "/:id");
    assert.equal(transformPath("/routes", "/routes/[id]/test.ts"), "/:id/test");
    assert.equal(transformPath("/routes", "/routes/[id] - [id2]/index.ts"), "/:id - :id2");
    assert.equal(transformPath("/routes", "/routes/[id] - [id2]/test.ts"), "/:id - :id2/test");
    assert.equal(transformPath("/routes", "/routes/[id] - [id2]/[id3]/index.ts"), "/:id - :id2/:id3");
    assert.equal(transformPath("/routes", "/routes/[id] - [id2]/[id3]/test.ts"), "/:id - :id2/:id3/test");
  });

  it("should add prefix", async () => {
    assert.equal(transformPath("/routes", "/routes/index.ts", "/api"), "/api");
    assert.equal(transformPath("/routes", "/routes/test.ts", "/api"), "/api/test");
    assert.equal(transformPath("/routes", "/routes/index.ts", "/api/"), "/api");
    assert.equal(transformPath("/routes", "/routes/test.ts", "/api/"), "/api/test");
    assert.equal(transformPath("/routes", "/routes/index.ts", "api"), "/api");
    assert.equal(transformPath("/routes", "/routes/test.ts", "api"), "/api/test");
  });
});
