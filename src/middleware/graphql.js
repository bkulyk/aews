const config = require('config');
const { formatError } = require('apollo-errors');
const NoIntrospection = require('graphql-disable-introspection');
const graphqlHTTP = require('express-graphql');
const convertHrtime = require('convert-hrtime');
const schema = require('../schema');

const validationRules = config.get('introspectionEnabled') ? null : [NoIntrospection];

const extensions = ({ result }) => {
  if (result.data && result.data.meta) {
    const start = result.data.meta[0];
    start.duration = convertHrtime(process.hrtime(start.start_time)).milliseconds;
    delete start.start_time;
  }
};

const graphql = graphqlHTTP({
  schema,
  graphiql: false,
  extensions,
  customFormatErrorFn: formatError,
  validationRules,
});

// wrap existing graphql middleware in one that runs next like it's supposed to.
module.exports = (req, res, next) => graphql(req, res, next).then(() => next());
