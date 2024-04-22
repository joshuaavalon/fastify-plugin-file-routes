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

export interface Routes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger
> {
  get?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
  head?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
  post?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
  put?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
  del?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
  options?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
  patch?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
  all?: Route<RawServer, RawRequest, RawReply, TypeProvider, Logger>;
}
