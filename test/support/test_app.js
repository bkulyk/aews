const app = require('../../src/app');
const router = require('../../src/router');
require('../../src/routes');

app.use(router);

module.exports = app;
