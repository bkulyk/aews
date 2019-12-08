const config = require('config');
const P = require('bluebird');
const router = require('../router');
const { version } = require('../../package.json');

const { client_id: clientId } = config;
const env = config.util.getEnv('NODE_ENV');

const checks = {
  whomi: P.resolve(clientId),
  version: P.resolve(version),
  self: P.resolve('ok'),
  env: P.resolve(env),
};

router.use('/health', (_req, res) => P.props(checks)
  .then(obj => res.json({ ...obj })));
