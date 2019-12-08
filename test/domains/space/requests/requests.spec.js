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
    // skip the cache
    '../../../lib/cache': { fetch: (_name, callback) => callback() },
    './fetch_from_nasa': function mockFetch() { return fetchSpy(); },
  },
);

describe('domains/space/requests', () => {
  const context = 'mock_context';

  describe('#getNeoList', () => {
    it('should get neo feed data from nasa', async () => {
      fetchSpy = sinon.spy(async () => ({ near_earth_objects: { yesterday: ['data'] } }));

      const result = await subject.getNeoList(context);
      expect(result).to.deep.equal({ near_earth_objects: { yesterday: ['data'] } });
    });
  });

  describe('#getNeoById', () => {
    it('should allow path parameters', async () => {
      fetchSpy = sinon.spy(() => ({ neoId: '4' }));

      const result = await subject.getNeoById(4, context);
      expect(result).to.deep.equal({ neoId: '4' });
    });
  });
});
