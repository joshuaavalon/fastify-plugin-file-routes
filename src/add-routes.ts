import { pathToFileURL } from "node:url";

import type { FastifyInstance } from "fastify";
import type { Route, Routes } from "./type.js";

type Methods = "all" | "delete" | "get" | "head" | "options" | "patch" | "post" | "put";

async function loadRoutes(path: string): Promise<Routes> {
  const url = pathToFileURL(path);
  const fileRoutes = (await import (url.toString())).default as Routes;
  const routes: Partial<Record<Methods, Route>> = {};
  const allowed = ["get", "head", "post", "put", "delete", "options", "patch", "all"];
  for (const [key, value] of Object.entries(fileRoutes)) {
    if (!allowed.includes(key)) {
      continue;
    }
    const route = value as Route;
    if (typeof route.handler !== "function") {
      throw new Error(`${path} contains ${key}.handler that is not a function`);
    }
    const method = key as Methods;
    routes[method] = value;
  }
  return routes;
}

interface Options {
  path: string;
  url: string;
}

export async function addRoutes(app: FastifyInstance, opts: Readonly<Options>): Promise<void> {
  const { path, url } = opts;
  const routes = await loadRoutes(path);

  for (const [key, value] of Object.entries(routes)) {
    const method = key as Methods;
    const route = value as Route | undefined;
    if (route) {
      app[method](url, route.opts, route.handler);
    }
  }
}
