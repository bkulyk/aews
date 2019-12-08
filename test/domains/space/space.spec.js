const R = require('rambda');
const { describe, it, expect } = require('../../bootstrap');
const space = require('../../../src/domains/space');

describe('space', () => {
  it('should have resolvers and a schema', async () => {
    expect(R.keys(space)).to.deep.equal(['resolvers', 'schema']);
  });
});
