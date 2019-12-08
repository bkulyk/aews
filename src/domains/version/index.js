const config = require('config');
const requireText = require('require-text');
const { version } = require('../../../package.json');

const versionNumber = `${version}.${config.buildNumber}`;

module.exports = {
  schema: requireText('./schema.graphql', require),

  resolvers: {
    Query: {
      version: () => versionNumber,
    },
  },
};
