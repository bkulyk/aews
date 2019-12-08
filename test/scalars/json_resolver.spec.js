const { Kind: kind } = require('graphql/language');
const {
  describe,
  it,
  expect,
} = require('../bootstrap');
const subject = require('../../src/scalars/resolvers/json_resolver');

describe('scalars/resolvers/long_resolver', () => {
  it('should have a name', async () => {
    expect(subject.name).to.equal('JSON');
  });

  it('should have a description', async () => {
    expect(subject.description).to.contain('object');
  });

  it('should be able to serialize a value', () => {
    expect(subject.serialize(111)).to.equal(111);
  });

  it('should be able to deserialize a value', () => {
    expect(subject.parseValue(111)).to.equal(111);
  });

  it('should be able to parse a literal', () => {
    expect(subject.parseLiteral({ kind: kind.STRING, value: '1' })).to.equal('1');

    expect(subject.parseLiteral({ kind: kind.INT, value: 1 })).to.equal(1);

    expect(subject.parseLiteral({ kind: kind.FLOAT, value: '1.2' })).to.equal(1.2);

    expect(subject.parseLiteral({
      kind: kind.OBJECT,
      fields: [
        { name: { value: 'sub-field' }, value: { kind: kind.FLOAT, value: '1.2' } },
      ],
    })).to.deep.equal({ 'sub-field': 1.2 });

    expect(subject.parseLiteral({
      kind: kind.LIST,
      values: [{ kind: kind.FLOAT, value: '1.2' }],
    })).to.deep.equal([1.2]);

    expect(subject.parseLiteral({ kind: 'unknown', value: '1.2' })).to.equal(null);
  });
});
