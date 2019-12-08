const AgentKeepAlive = require('agentkeepalive');
const {
  describe,
  it,
  expect,
} = require('../../bootstrap');
const MockContext = require('../../mock_context');
const { requestOptions: subject } = require('../../../src/lib/request/request_options');

describe('lib/request_options', () => {
  const context = new MockContext();

  describe('agent keep alive', () => {
    it('should add agent keep alive options', async () => {
      const result = await subject({
        uri: 'http://example.com/some-test',
      }, context);

      expect(Object.keys(result)).to.include('agent');
      expect(result.agent).to.be.instanceOf(AgentKeepAlive);
      expect(result.agent).to.not.be.instanceOf(AgentKeepAlive.HttpsAgent);
    });

    it('should add agent keep alive when options have base url', async () => {
      const result = await subject({
        baseUrl: 'http://example.com/some-test',
      }, context);

      expect(Object.keys(result)).to.include('agent');
      expect(result.agent).to.be.instanceOf(AgentKeepAlive);
      expect(result.agent).to.not.be.instanceOf(AgentKeepAlive.HttpsAgent);
    });

    it('should NOT add agent keep alive options', async () => {
      const result = await subject({
        uri: 'https://example.com/some-test',
      });

      expect(Object.keys(result)).to.include('agent');
      expect(result.agent).to.be.instanceOf(AgentKeepAlive);
      expect(result.agent).to.be.instanceOf(AgentKeepAlive.HttpsAgent);
    });
  });

  describe('path parameters', () => {
    it('should replace path parameters with params', async () => {
      const result = await subject({
        uri: 'http://example.com/book/{title}/author',
        params: { title: 'bob-jones' },
      });

      expect(result.uri).to.equal('http://example.com/book/bob-jones/author');
    });
  });
});
