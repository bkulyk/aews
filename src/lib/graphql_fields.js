/* eslint no-unused-vars: off */
const graphQLFields = require('graphql-fields');

module.exports = (info) => {
  try {
    return graphQLFields(info);
  } catch (_exception) {
    return {};
  }
};
