const requireText = require('require-text');
const { makeExecutableSchema } = require('graphql-tools');
const R = require('lib/r');
const domains = require('./domains');
const scalars = require('./scalars');
const { resolvers: schemaDirectives, schema: schemaDirectiveSchema } = require('./directives');

const baseSchema = R.concat(requireText('./schema.graphql', require), schemaDirectiveSchema);

const graphModules = [...domains, scalars];

const defaultResolvers = {
  Query: { meta: (_parent, _args, context) => context.meta },
  Mutation: { meta: (_parent, _args, context) => context.meta },
};

const schema = R.reduce(
  R.concat,
  baseSchema,
  R.map(domain => domain.schema || '', graphModules),
);

const resolvers = R.reduce(
  R.mergeDeepRight,
  defaultResolvers,
  R.map(domain => domain.resolvers || {}, graphModules),
);

// resolvers are loaded separately from schema definition, then combined
module.exports = makeExecutableSchema({ typeDefs: schema, resolvers, schemaDirectives });
