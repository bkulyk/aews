const config = require('config');
const handleNasaErrors = require('./handle_nasa_errors');

const { baseUrl, apiKey } = config.get('nasa');

const fetchFromNasa = (context, uri, params) => context.fetch(
  uri,
  { baseUrl, qs: { api_key: apiKey }, params },
).catch(handleNasaErrors);

module.exports = fetchFromNasa;
