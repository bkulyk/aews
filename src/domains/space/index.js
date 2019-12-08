const requireText = require('require-text');
const R = require('lib/r');
const resolvers = require('./resolvers');

const schema = R.pipe(
  R.map(name => requireText(`./${name}.graphql`, require)),
  R.join('\n\n'),
)(['schema', 'additional_data']);

module.exports = {
  resolvers,
  schema,
};
