const { request_defaults: requestDefaults } = require('config');
const AgentKeepAlive = require('agentkeepalive');
const subs = require('subs');
const R = require('../r');

const agent = new AgentKeepAlive();
const sslAgent = new AgentKeepAlive.HttpsAgent();

const defaultOptions = {
  method: 'GET',
  gzip: false,
  json: true,
  time: true,
  resolveWithFullResponse: true,
  ...requestDefaults,
};

const correlationHeaders = (clientId, correlationId) => ({
  headers: {
    'X-Client-ID': clientId,
    'X-Correlation-ID': correlationId,
  },
});

// pick the correct keep alive agent
const agentKeepAlive = options => ({
  agent: ((options.baseUrl || options.uri).indexOf('https://') < 0 ? agent : sslAgent),
});

const subPathTokens = options => ({
  normalizedUri: options.uri,
  uri: options.params ? subs(options.uri, options.params) : options.uri,
});

module.exports = {
  requestOptions: async (options, context) => {
    const { clientId, correlationId } = context || {};

    return R.reduce(R.mergeDeepRight, {}, [
      defaultOptions,
      options,
      subPathTokens(options),
      correlationHeaders(clientId, correlationId),
      agentKeepAlive(options),
    ]);
  },
};
