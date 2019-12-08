const camelCase = require('camelcase-keys');

const deepCamelCaseKeys = data => (
  data && typeof data === 'object'
    ? camelCase(data, { deep: true })
    : data
);

module.exports = deepCamelCaseKeys;
