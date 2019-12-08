const proxyquire = require('proxyquire').noPreserveCache();
const { describe, it, expect } = require('../../bootstrap');

function MockPrettyConsole() {
  this.pipe = () => {};
  return this;
}

const subject = proxyquire('../../../src/lib/logger/pretty_console_stream', {
  'bunyan-prettystream': MockPrettyConsole,
});

describe('logger/pretty_console_stream', () => {
  const cfg = {
    logger: {
      general: { some: 'stuff' },
      elasticSearch: {},
    },
  };

  it('should create a stream', async () => {
    const res = subject(cfg);
    expect(res.some).to.equal('stuff');
    expect(res.stream instanceof MockPrettyConsole).to.equal(true);
  });
});
