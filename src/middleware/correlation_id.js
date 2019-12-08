const uuid = require('uuid/v4');
const dig = require('object-dig');
const config = require('config');

const correlationIdMiddleware = (req, res, next) => {
  const { headers } = req;
  const clientId = dig(headers, 'X-Client-ID') || dig(headers, 'x-client-id') || dig(req, 'query', 'client_id') || dig(req, 'body', 'client_id');

  req.correlationId = dig(headers, 'X-Correlation-ID') || dig(headers, 'x-correlation-id') || uuid();
  req.clientId = `${clientId}-${config.client_id}`;
  req.incomingClientId = `${clientId}`;
  res.set('X-Correlation-ID', req.correlationId);
  next();
};

module.exports = correlationIdMiddleware;
