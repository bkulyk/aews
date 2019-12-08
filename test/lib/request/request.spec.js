const P = require('bluebird');
const R = require('ramda');
const nock = require('nock');
const MockContext = require('../../mock_context');
const {
  describe,
  it,
  expect,
  beforeEach,
} = require('../../bootstrap');

describe('Request', () => {
  let context;
  let exampleDotCom;

  beforeEach(async () => {
    context = new MockContext();
    exampleDotCom = nock('http://example.com');
  });

  describe('#fetch', () => {
    it('should fetch a url and parse json', async () => {
      exampleDotCom.get('/simple').reply(200, '{ "simple": "response" }');

      const res = await context.fetch('http://example.com/simple');

      expect(res).to.deep.equal({
        simple: 'response',
      });
    });

    it('should add meta data to the context', async () => {
      exampleDotCom.get('/').reply(200, '');

      await context.fetch('http://example.com');

      expect(context.meta.length).to.equal(1);
      const [meta] = context.meta;
      expect(meta.method).to.equal('GET');
      expect(meta.uri).to.equal('http://example.com');
    });

    it('should keep metadata for multiple calls', () => {
      exampleDotCom.get('/').reply(200, '');
      exampleDotCom.get('/something').reply(200, '');

      return P.all([context.fetch('http://example.com'), context.fetch('http://example.com/something')])
        .then(() => {
          expect(context.meta.length).to.equal(2);
          const urlsCalled = R.map(R.prop('uri'), context.meta);
          expect(urlsCalled).to.include('http://example.com');
          expect(urlsCalled).to.include('http://example.com/something');
        });
    });

    it('should not explode if the meta field was removed, somehow', async () => {
      exampleDotCom.get('/').reply(200, '{"simple":"response"}');
      delete context.meta;

      const res = await context.fetch('http://example.com');

      expect(res).to.deep.equal({ simple: 'response' });
    });

    it('should be able to handle a POST request', async () => {
      exampleDotCom.post('/').reply(200, '{"simple":"body"}');

      await context.fetch('http://example.com', { method: 'POST', body: { simple: 'body' } });

      const [meta] = context.meta;
      expect(meta.method).to.equal('POST');
    });

    it('should have null POST body if none was provided', async () => {
      exampleDotCom.post('/').reply(200, '');

      await context.fetch('http://example.com', { method: 'POST' });

      const [meta] = context.meta;
      expect(meta.method).to.equal('POST');
      expect(meta.body).to.equal(undefined);
    });

    it('should add correlation id and client id headers', async () => {
      exampleDotCom.get('/').reply(200, 'ignoreing this');
      await context.fetch('http://example.com/', {
        reqheaders: {
          'X-Client-ID': 'asdf',
          'X-Correlation-ID': 'fake-correlation-id',
        },
      });
      exampleDotCom.done();
    });

    it('should return text from a fetch call', async () => {
      exampleDotCom.get('/text').reply(200, 'some text');
      const res = await context.fetch('http://example.com/text');
      expect(res).to.equal('some text');
    });

    it('should catch errors and add them to the meta data', () => {
      exampleDotCom.get('/not-available').reply(404, 'test error');
      return context.fetch('http://example.com/not-available').catch(() => {
        expect(context.meta[0].status).to.equal(404);
        expect(context.meta[0].error).to.equal('404 - "test error"');
      });
    });
  });
});
