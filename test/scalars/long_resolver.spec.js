const {
  describe,
  it,
  expect,
} = require('../bootstrap');
const subject = require('../../src/scalars/resolvers/long_resolver');

describe('scalars/resolvers/long_resolver', () => {
  it('should have a name', async () => {
    expect(subject.name).to.equal('Long');
  });

  it('should have a description', async () => {
    expect(subject.description).to.contain('Long');
  });

  it('should be able to serialize a value', () => {
    expect(subject.serialize(111)).to.equal(111);
  });

  it('should be able to deserialize a value', () => {
    expect(subject.parseValue(111)).to.equal(111);
  });
});
