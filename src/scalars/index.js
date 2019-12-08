const requireText = require('require-text');
const dateResolver = require('./resolvers/date_resolver');
const dateTimeResolver = require('./resolvers/date_time_resolver');
const longResolver = require('./resolvers/long_resolver');
const jsonResolver = require('./resolvers/json_resolver');

module.exports = {
  schema: requireText('./schema.graphql', require),

  resolvers: {
    Date: dateResolver,
    DateTime: dateTimeResolver,
    Long: longResolver,
    JSON: jsonResolver,
  },
};
