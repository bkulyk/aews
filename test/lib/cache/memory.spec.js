const sinon = require('sinon');
const proxyquire = require('proxyquire').noPreserveCache();
const { describe, it, expect } = require('../../bootstrap');

const spies = {
  get: sinon.spy(),
  put: sinon.spy(),
  del: sinon.spy(),
  keys: sinon.spy(),
  clear: sinon.spy(),
};

const subject = proxyquire('../../../src/lib/cache/memory', {
  'memory-cache': {
    Cache: function Cache() { return spies; },
  },
})();

describe('lib/cache/memory', () => {
  describe('#get', () => {
    it('should be able to get a key', async () => {
      await subject.get('a key');
      expect(spies.get.calledOnce).to.equal(true);
    });
  });

  describe('#put', () => {
    it('should be able to put a key', async () => {
      await subject.put('a key', 'a val');
      expect(spies.put.calledOnce).to.equal(true);
    });
  });

  describe('#del', () => {
    it('should be able to delete a key', async () => {
      await subject.del('a key');
      expect(spies.del.calledOnce).to.equal(true);
    });
  });

  describe('#clear', () => {
    it('should be able to clear keys', async () => {
      await subject.clear();
      expect(spies.clear.calledOnce).to.equal(true);
    });
  });
});
