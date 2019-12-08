// const sinon = require('sinon');
const proxyquire = require('proxyquire').noPreserveCache();
const {
  describe,
  it,
  expect,
  beforeEach,
} = require('../../bootstrap');

const memoryAdapter = require('../../../src/lib/cache/memory');

const subject = proxyquire('../../../src/lib/cache', {
  config: { adapter: 'file' },
  './file': memoryAdapter,
  './memory': memoryAdapter,
});

describe('lib/cache', () => {
  beforeEach(async () => {
    await subject.clear();
    await subject.put('already', 'there');
  });

  describe('#get/#put', () => {
    it('should be able to get/set', async () => {
      await subject.put('qwerty', 999);
      expect(await subject.get('qwerty')).to.equal(999);
    });
  });

  describe('#keys', async () => {
    it('should able to get cache keys', async () => {
      expect(await subject.keys()).to.deep.equal(['already']);
    });
  });

  describe('#clear', async () => {
    it('should able to get clear keys', async () => {
      await subject.clear();
      expect(await subject.keys()).to.deep.equal([]);
    });
  });

  describe('#fetch', () => {
    it('should get a key if the key exists', async () => {
      const val = await subject.fetch('already', () => 'not this');
      expect(val).to.equal('there');
    });

    it('should add a key if the key is not already there', async () => {
      const val = await subject.fetch('not-there', () => 'new-val');
      expect(val).to.equal('new-val');
    });

    it('should not add the new value if it was null', async () => {
      const val = await subject.fetch('null-val-test', () => null);
      expect(val).to.equal(null);
    });
  });
});
