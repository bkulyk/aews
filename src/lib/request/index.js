const requestPromise = require('request-promise');
const R = require('lib/r');
const { requestOptions: buildOptions } = require('./request_options');

const logTimingInfo = (options, response, context) => {
  const {
    uri,
    method,
    qs,
    baseUrl,
    normalizedUri,
  } = options;
  if (context && context.addMetaData) {
    const logData = {
      uri: normalizedUri,
      qs,
      timings: response.timingPhases,
      method,
      baseUrl,
      fullUri: uri,
      headers: response.headers,
    };
    context.addMetaData(logData);
    context.logger.info(logData, 'api request completed');
  }
  return response;
};

const logErrorAndReThrow = (url, err, context) => {
  if (context && context.addMetaData) {
    const logData = { url, error: err.message, status: err.statusCode };
    context.addMetaData(logData);
    context.logger.error(logData, 'api request failed');
  }
  throw err;
};

const logErrorIfStringBody = (uri, body, context) => {
  if (context && context.addMetaData && typeof body === 'string') {
    context.addMetaData({ uri, error: 'JSON Response Body', body });
    context.logger.warn({ uri }, 'api request failed - response body is not json');
  }
  return body;
};

function request(uri, options) {
  return buildOptions({ ...options, uri }, this)
    .then(requestOptions => requestPromise(requestOptions.uri, requestOptions, this)
      .then(response => logTimingInfo(requestOptions, response, this))
      .then(R.prop('body'))
      .then(body => logErrorIfStringBody(requestOptions.uri, body, this)))
    .catch(err => logErrorAndReThrow(uri, err, this));
}

module.exports = {
  request,

  requestText: (uri, options) => request(uri, { json: false, ...options }),
};
