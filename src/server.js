require('dotenv').config();
const config = require('config');
const app = require('./app');
const router = require('./router');
const logger = require('./lib/logger');

require('dnscache')({ enable: true, ttl: 120 });
require('./routes');

const { port } = config;
const NODE_ENV = config.util.getEnv('NODE_ENV');

app.use(router);

app.listen(port, '0.0.0.0', () => {
  logger.info('Node server start at:');
  logger.info(`http://localhost:${port}/`);
  logger.info(`Config file: ${NODE_ENV}.json`);
});

module.exports = app;
