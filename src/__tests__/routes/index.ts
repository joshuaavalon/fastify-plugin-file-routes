import { routes } from "../../index.js";

export default routes({
  get: {
    opts: {},
    async handler(req, res) {
      res.send("hello world");
    }
  }
});
