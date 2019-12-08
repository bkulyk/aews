const dig = require('object-dig');
const PrettyStream = require('bunyan-prettystream');

const createConsoleStream = (config) => {
  const stream = new PrettyStream();
  stream.pipe(process.stdout);

  return {
    ...(dig(config, 'logger', 'general') || {}),
    stream,
  };
};

module.exports = createConsoleStream;
