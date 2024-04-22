import type { Route } from "../../../index.js";

export const get = {
  opts: {},
  async handler(req, res) {
    const { params } = req;
    res.send(params);
  }
} satisfies Route;
