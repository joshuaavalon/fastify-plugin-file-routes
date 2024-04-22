import { lstat, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { addRoutes } from "./add-routes.js";
import { transformPath } from "./transform-path.js";

import type { FastifyInstance } from "fastify";

interface Options {
  baseDir: string;
  ignore: RegExp;
  match: RegExp;
  prefix: string;
}

export async function scanDirectories(app: FastifyInstance, opts: Readonly<Options>, curPath = ""): Promise<void> {
  const { baseDir, ignore, prefix, match } = opts;
  const resolved = resolve(baseDir, curPath);
  const stat = await lstat(resolved);
  if (ignore.test(curPath)) {
    return;
  }

  if (stat.isDirectory()) {
    for (const entry of await readdir(resolved)) {
      await scanDirectories(app, { ...opts, baseDir }, join(curPath, entry));
    }
  } else if (stat.isFile() && match.test(curPath)) {
    const url = transformPath(baseDir, resolved, prefix);
    await addRoutes(app, { path: resolved, url });
  }
}
