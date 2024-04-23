import { routes } from "../../../index.js";

export default routes({
  get: {
    opts: {},
    async handler(req, res) {
      const { params } = req;
      res.send(params);
    }
  }
});
