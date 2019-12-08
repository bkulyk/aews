const requireText = require('require-text');
const resolvers = require('./resolvers');

const schema = requireText('./schema.graphql', require);

module.exports = {
  resolvers,
  schema,
};
