const R = require('rambda');
const { describe, it, expect } = require('../bootstrap');
const subject = require('../../src/lib/r');

describe('lib/r', () => {
  const keys = R.keys(subject);

  it('should have functions from ramda', () => {
    expect(keys).to.include('and');
  });

  it('should have function from rambda', () => {
    expect(keys).to.include('partialCurry');
  });

  it('should have custom functions', () => {
    expect(keys).to.include('deepProp');
  });

  describe('#deepProp', () => {
    it('should access deeply nested data', () => {
      const data = { some: { deep: [{ nested: 'data' }] } };
      expect(subject.deepProp(['some', 'deep', 0, 'nested'])(data)).to.equal('data');
    });
  });
});
