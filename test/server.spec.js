const request = require('request-promise');
const {
  beforeAll,
  afterAll,
  describe,
  expect,
  it,
} = require('./bootstrap');
const testApp = require('./support/test_app');

describe('Server', () => {
  let testServer;

  beforeAll(() => {
    testServer = testApp.listen(8121);
    return testServer;
  });

  afterAll(async () => testServer.close());

  describe('GET /health', () => {
    let data = {};

    beforeAll(async () => {
      data = await request('http://localhost:8121/health', { json: true });
    });

    it('should be status 200', async () => {
      expect(data.whomi).to.equal('graphic');
      expect(data.version).to.contain('1.0');
      expect(data.self).to.equal('ok');
      expect(data.env).to.equal('test');
    });
  });

  describe('/graphql', () => {
    it('should throw error if no query was supplied', async () => {
      try {
        await request('http://localhost:8121/graphql', { json: true });
      } catch (err) {
        expect(err.message).to.contain('query string');
      }
    });

    it('should return some data, if a valid query was sent.', async () => {
      const body = { query: '{ version, meta }' };
      const { data } = await request('http://localhost:8121/graphql', { json: true, method: 'POST', body });
      expect(data.version).to.equal('1.0.0.test');
    });
  });
});
