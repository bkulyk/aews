const sinon = require('sinon');
const proxyquire = require('proxyquire').noPreserveCache();
const { describe, it, expect } = require('../../bootstrap');

const spies = {
  get: sinon.spy(),
  set: sinon.spy(),
  remove: sinon.spy(),
  keys: sinon.spy(),
  clear: sinon.spy(),
};

const subject = proxyquire('../../../src/lib/cache/file', {
  'file-system-cache': {
    default: () => spies,
  },
})();

describe('lib/cache/file', () => {
  describe('#get', () => {
    it('should be able to get a key', async () => {
      await subject.get('a key');
      expect(spies.get.calledOnce).to.equal(true);
    });
  });

  describe('#put', () => {
    it('should be able to put a key', async () => {
      await subject.put('a key', 'a val');
      expect(spies.set.calledOnce).to.equal(true);
    });
  });

  describe('#del', () => {
    it('should be able to delete a key', async () => {
      await subject.del('a key');
      expect(spies.remove.calledOnce).to.equal(true);
    });
  });

  describe('#clear', () => {
    it('should be able to clear keys', async () => {
      await subject.clear();
      expect(spies.clear.calledOnce).to.equal(true);
    });
  });
});
