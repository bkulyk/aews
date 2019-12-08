const R = require('../../lib/r');
const { getNeoList, getNeoById } = require('./requests');

const getNeoAsteroids = context => getNeoList(context).then(R.pipe(
  R.prop('near_earth_objects'),
  R.values,
  R.flatten,
));

const takeClosest = count => R.pipe(
  R.sortBy(R.deepProp(['close_approach_data', 'miss_distance', 'kilometers'])),
  R.take(count),
);

module.exports = {
  Query: {
    getNearbyAsteroids: (_root, _args, context) => getNeoAsteroids(context),
    getClosestAsteroids: (_root, { count = 3 }, context) => getNeoAsteroids(context)
      .then(takeClosest(count)),
    getAsteroid: (_root, { id }, context) => getNeoById(id, context),
  },

  AEWSAsteroidOverview: {
    miss_distance: R.deepProp(['close_approach_data', 0, 'miss_distance', 'kilometers']),
    miss_date: R.deepProp(['close_approach_data', 0, 'close_approach_date']),
    is_dangerous: R.prop('is_potentially_hazardous_asteroid'),
    asteroid_details: ({ id }, _args, context) => getNeoById(id, context),
  },

  AEWSAsteroid: {
    asteroid_orbit_id: R.deepProp(['orbital_data', 'orbit_id']),
    determination_date: R.deepProp(['orbital_data', 'orbit_determination_date']),
    first_observation: R.deepProp(['orbital_data', 'first_observation_date']),
    last_observation: R.deepProp(['orbital_data', 'last_observation_date']),
    data_arc_days: R.deepProp(['orbital_data', 'data_arc_in_days']),
    observations: R.deepProp(['orbital_data', 'observations_used']),
    weirdness: R.deepProp(['orbital_data', 'eccentricity']),
    major_axis_semi: R.deepProp(['orbital_data', 'semi_major_axis']),
    class: R.deepProp(['orbital_data', 'orbit_class']),
  },

  AEWSOrbitClass: {
    type: R.prop('orbit_class_type'),
    range: R.prop('orbit_class_range'),
    description: R.prop('orbit_class_description'),
  },
};
