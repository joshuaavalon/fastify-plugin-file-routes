import { basename, extname, relative, sep } from "node:path";

const paramRegex = /\[(?<param>.+?)\]/gu;

function replaceParams(pathSeg: string, isFile: boolean): string {
  // Remove extension if it is file
  const name = isFile ? basename(pathSeg, extname(pathSeg)) : pathSeg;
  if (name === "index") {
    return "";
  }
  return name.replace("[...]", "*").replaceAll(paramRegex, (_str, match) => `:${match}`);
}

export function transformPath(baseDir: string, curPath: string, prefix = "/"): string {
  const path = relative(baseDir, curPath);
  const pathSegments = path.split(sep);
  let url = prefix;
  if (!url.endsWith("/")) {
    url = `${url}/`;
  }
  url += pathSegments.map((seg, i) => replaceParams(seg, pathSegments.length - 1 === i)).join("/");
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  if (url.length === 0) {
    return prefix;
  }
  if (!url.startsWith("/")) {
    url = `/${url}`;
  }
  return url.replace("//", "/");
}
