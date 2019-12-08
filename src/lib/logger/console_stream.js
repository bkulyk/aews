const dig = require('object-dig');

const createConsoleStream = config => ({
  ...(dig(config, 'logger', 'general') || {}),
  stream: process.stdout,
});

module.exports = createConsoleStream;
