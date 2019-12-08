const dig = require('object-dig');
const onHeaders = require('on-headers');
const convertHrtime = require('convert-hrtime');
const { client_id: clientId, logger: loggerConfig } = require('config');
const logger = require('../lib/logger');

const site = clientId || 'set your clientId in your default.json config file';
const { level } = dig(loggerConfig, 'general') || 'info';

const buildLogger = req => (logger.child({
  level,
  site,
  url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
  'Correlation-ID': req.correlationId,
  'Client-ID': req.incomingClientId,
  Method: req.method,
}));

module.exports = (req, res, next) => {
  const log = buildLogger(req);

  log.info('Request starting');
  req.logger = log;
  const start = process.hrtime();

  onHeaders(res, () => {
    const duration = convertHrtime(process.hrtime(start)).milliseconds;
    log.info({ ElapsedMilliseconds: duration, StatusCode: res.statusCode }, 'Request finished');
  });

  next();
};
