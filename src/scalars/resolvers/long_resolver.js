module.exports = {
  name: 'Long',

  description: 'Long Int',

  serialize: value => parseInt(value, 10),

  parseValue: value => parseInt(value, 10),
};
