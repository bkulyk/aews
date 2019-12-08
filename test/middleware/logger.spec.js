const {
  describe,
  it,
  expect,
} = require('../bootstrap');
const subject = require('../../src/middleware/logger');

describe('middleware/logger', () => {
  it('should build a logger based of info from the request object', async () => {
    const req = {
      correlationId: 'some-id',
      clientId: 'some-client',
      protocol: 'http',
      originalUrl: '/',
      method: 'POST',
      get: () => 'someHost',
    };
    const res = {};

    await new Promise((resolve) => {
      subject(req, res, resolve);
    });

    expect(req).to.haveOwnProperty('logger');
  });
});
