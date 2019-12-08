const proxyquire = require('proxyquire').noPreserveCache();
const sinon = require('sinon');
const {
  describe,
  it,
  expect,
} = require('../../../bootstrap');

let fetchSpy;
const subject = proxyquire(
  '../../../../src/domains/space/requests/index',
  {
    '../../../lib/cache': { fetch: (_name, callback) => callback() },
    './fetch_from_nasa': function mockFetch() { return fetchSpy(); },
  },
);

describe('requests', () => {
  const context = 'mock_context';

  it('should get neo feed data from nasa', async () => {
    fetchSpy = sinon.spy(async () => ({ feed: 'data' }));

    const result = await subject.getNeoList(context);
    expect(result).to.deep.equal({ feed: 'data' });
  });

  it('should allow path parameters', async () => {
    fetchSpy = sinon.spy(() => ({ neoId: '4' }));

    const result = await subject.getNeoById(4, context);
    expect(result).to.deep.equal({ neoId: '4' });
  });
});
