const { describe, it, expect } = require('../../bootstrap');
const version = require('../../../src/domains/version');

describe('version', () => {
  describe('.schema', () => {
    const { schema: subject } = version;
    it('should export a schema', () => {
      expect(subject).to.include('Query');
    });
  });
});
