/* eslint no-param-reassign:off */
const { defaultFieldResolver } = require('graphql');
const { SchemaDirectiveVisitor } = require('graphql-tools');

const resolveWrapper = (resolve, type) =>
  (parent, args, context, info) => {
    const { logger } = context;
    const { fieldName, parentType } = info;
    logger.info({ fieldName, parentType }, `deprecated ${type} was called`);
    context.addMetaData({ message: `deprecated ${type} was called`, fieldName, parentType });
    return resolve(parent, args, context, info);
  };

class DeprecatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.isDeprecated = true;
    field.deprecationReason = this.args.reason;
    field.resolve = resolveWrapper(field.resolve || defaultFieldResolver, 'field');
  }

  visitEnumValue(value) {
    value.isDeprecated = true;
    value.deprecationReason = this.args.reason;
  }

  visitArgumentDefinition(value) {
    value.isDeprecated = true;
    value.deprecationReason = this.args.reason;
  }
}

module.exports = {
  deprecated: DeprecatedDirective,
};
