import { lstat } from "node:fs/promises";
import { resolve } from "node:path";
import fp from "fastify-plugin";
import { scanDirectories } from "./scan-directories.js";

const name = "@joshuaavalon/fastify-plugin-file-routes";

interface Options {
  baseDir: string;
  ignore?: RegExp;
  match?: RegExp;
  prefix?: string;
}

const defaultIgnore = /^\.|^_|\.test\.|\.spec\.|__tests__/gu;
const defaultMatch = /\.js/gu;

export default fp<Readonly<Options>>(
  async (app, opts) => {
    const { baseDir, ignore = defaultIgnore, match = defaultMatch, prefix = "/" } = opts;
    const stat = await lstat(baseDir);
    if (!stat.isDirectory()) {
      throw new Error(`${resolve(baseDir)} is not a directory`);
    }
    await scanDirectories(app, { baseDir, ignore, match, prefix });
  },
  {
    name,
    fastify: "4.x",
    dependencies: []
  }
);

export * from "./type.js";
