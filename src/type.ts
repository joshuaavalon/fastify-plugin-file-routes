import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifySchema,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface,
  RouteHandlerMethod,
  RouteShorthandOptions
} from "fastify";


export interface Route<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema
> {
  opts: RouteShorthandOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>;
  handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>;
}

export interface Routes<Get extends Route = Route, Head extends Route = Route, Post extends Route = Route, Put extends Route = Route, Delete extends Route = Route, Options extends Route = Route, Patch extends Route = Route, All extends Route = Route> {
  get?: Get;
  head?: Head;
  post?: Post;
  put?: Put;
  delete?: Delete;
  options?: Options;
  patch?: Patch;
  all?: All;
}

export function routes<T extends Routes>(r: T): T {
  return r;
}
