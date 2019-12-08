const Ramda = require('ramda');
const Rambda = require('rambda');
const dig = require('object-dig');

// object-dig is faster than path, so we'll make a curried version
const deepProp = Rambda.curry((path, obj) => dig(obj, ...path));

/**
 * Rambda is faster, but Ramda is more complete, let's use the best of both words.
 */
module.exports = {
  ...Ramda,
  ...Rambda,
  deepProp,
};
