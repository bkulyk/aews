const config = require('config');
const deepCamelCaseKeys = require('../../../lib/deep_camel_case_keys');
const handleNasaErrors = require('./handle_nasa_errors');

const { baseUrl, apiKey } = config.get('nasa');

const fetchFromNasa = (context, uri, params) => context.fetch(
  uri,
  { baseUrl, qs: { api_key: apiKey }, params },
).then(deepCamelCaseKeys).catch(handleNasaErrors);

module.exports = fetchFromNasa;
