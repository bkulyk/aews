const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const correlationIdMiddleware = require('./middleware/correlation_id');
const disableNagle = require('./middleware/disable_nagle');
const loggerMiddleware = require('./middleware/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(disableNagle);
app.use(correlationIdMiddleware);
app.use(loggerMiddleware);
app.use(cors());

module.exports = app;
