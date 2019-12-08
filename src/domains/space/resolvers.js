const R = require('lib/r');
const { getNeoList, getNeoById } = require('./requests');

const l = x => { console.log('----', x); return x; };

const closest = count => R.pipe(
  l,
  R.path(['data', 'nearEarthObjects', 'nodes']),
  R.sortBy(R.path(['miss_distance', 'kilometers'])),
  R.take(count),
);

module.exports = {
  Query: {
    getNearEarthObjects: (_root, _args, context) => getNeoList(context),

    closestNearEarthObject: (_root, { count = 3 }, context) => closest(count)(context),

    getNearEarthObjectById: (_root, { id }, context) => getNeoById(id, context),
  },

  NearEarthObjectPage: {
    nodes: ({ nearEarthObjects }) => R.pipe(R.values, R.flatten)(nearEarthObjects),

    pageInfo: ({ links, elementCount: count }) => ({
      ...links,
      count,
    }),
  },

  NearEarthObjectSummary: {
    nearEarthObject: ({ id }, _args, context) => getNeoById(id, context),
  },
};
