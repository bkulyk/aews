const {
  describe,
  it,
  expect,
} = require('../bootstrap');
const MockContext = require('../mock_context');
const { deprecated: DeprecatedDirective } = require('../../src/directives/deprecated/resolvers');

describe('directives/deprecated_directive', () => {
  describe('#visitFieldDefinition', () => {
    const context = new MockContext();
    const info = {
      fieldName: 'five',
      parentType: 'Query',
    };

    describe('with a resolver provided', () => {
      const field = {
        isDeprecated: false,
        deprecationReason: undefined,
        resolve: () => 5,
        name: 'five',
      };
      const subject = new DeprecatedDirective({ name: 'deprecated', args: { reason: 'because i said so' } });
      subject.visitFieldDefinition(field);

      it('should mark a field as deprecated', async () => {
        expect(field.isDeprecated).to.equal(true);
        expect(field.deprecationReason).to.equal('because i said so');
      });

      it('should wrap the resolver, but not interfere with the result', async () => {
        expect(field.resolve({}, {}, context, info)).to.equal(5);
      });

      it('should have added a message to meta data', async () => {
        expect(context.meta).to.deep.equal([{
          message: 'deprecated field was called',
          fieldName: 'five',
          parentType: 'Query',
        }]);
      });
    });

    describe('with a default resolver', () => {
      const field = {
        isDeprecated: false,
        deprecationReason: undefined,
        name: 'five',
      };
      const subject = new DeprecatedDirective({ name: 'deprecated', args: { reason: 'because i said so' } });
      subject.visitFieldDefinition(field);

      it('should wrap the resolver, but not interfere with the the default resolver', async () => {
        expect(field.resolve({ five: 555 }, {}, context, info)).to.equal(555);
      });
    });
  });

  describe('#visitFieldDefinition', () => {
    const subject = new DeprecatedDirective({ name: 'deprecated', args: { reason: 'because i said so' } });
    const value = {
      name: 'MITSUBISHI',
      isDeprecated: false,
      deprecationReason: undefined,
    };
    subject.visitEnumValue(value);

    it('should mark a enum value as deprecated', async () => {
      expect(value.isDeprecated).to.equal(true);
      expect(value.deprecationReason).to.equal('because i said so');
    });
  });

  describe('#visitArgumentDefinition', () => {
    const subject = new DeprecatedDirective({ name: 'deprecated', args: { reason: 'because i said so' } });
    const value = {
      name: 'vehicleBrandName',
      isDeprecated: false,
      deprecationReason: undefined,
    };
    subject.visitArgumentDefinition(value);

    it('should mark a enum value as deprecated', async () => {
      expect(value.isDeprecated).to.equal(true);
      expect(value.deprecationReason).to.equal('because i said so');
    });
  });
});
