const { describe, it, expect } = require('../../bootstrap');
const subject = require('../../../src/lib/logger/console_stream');

describe('logger/console_stream', () => {
  it('should create a simple console stream', async () => {
    const cfg = { logger: { general: { some: 'thing' } } };
    const res = subject(cfg);
    expect(res.some).to.equal('thing');
    expect(res.stream).to.equal(process.stdout);
  });
});
