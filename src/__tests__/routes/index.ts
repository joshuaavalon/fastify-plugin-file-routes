import type { Route } from "../../index.js";

export const get = {
  opts: {},
  async handler(req, res) {
    res.send("hello world");
  }
} satisfies Route;
