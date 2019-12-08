const dig = require('object-dig');
const config = require('config');
const { createLogger } = require('bunyan');
const R = require('lib/r');
const consoleStream = require('./console_stream');
const prettyConsole = require('./pretty_console_stream');

const availableStreams = { prettyConsole, console: consoleStream };
const enabledStreams = R.map(s => availableStreams[s](config), dig(config, 'logger', 'streams') || ['console']);

const logger = createLogger(R.head(enabledStreams));
R.forEach(s => logger.addStream(s), R.tail(enabledStreams));

module.exports = logger;
