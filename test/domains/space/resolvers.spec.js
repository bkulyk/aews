const R = require('rambda');
const proxyquire = require('proxyquire').noPreserveCache();
const { describe, it, expect } = require('../../bootstrap');
const mockAsteroidList = require('./mock_asteroid_list.json');

const resolvers = proxyquire(
  '../../../src/domains/space/resolvers',
  {
    './requests': {
      getNeoList: async () => mockAsteroidList,
      getNeoById: (...args) => (['getNeoById', ...args]),
    },
  },
);

describe('domains/space/resolvers', () => {
  describe('.Query', () => {
    const { Query: subject } = resolvers;

    describe('#getNearbyAsteroids', () => {
      it('should get a list of asteroids', async () => {
        const asteroids = await subject.getNearbyAsteroids({}, {}, 'context');
        expect(asteroids.length).to.equal(5);
        expect(R.head(asteroids)).to.deep.equal({
          name: 'Homer',
          close_approach_data: {
            miss_distance: {
              kilometers: 88,
            },
          },
        });
      });
    });

    describe('#getClosestAsteroids', () => {
      it('should get a list of asteroids', async () => {
        const asteroids = await subject.getClosestAsteroids({}, { count: 2 }, 'context');
        expect(asteroids.length).to.equal(2);
        const distances = R.map(R.path(['close_approach_data', 'miss_distance', 'kilometers']))(asteroids);
        expect(distances).to.deep.equal([11, 55]);
      });
    });

    describe('#getAsteroid', () => {
      it('should fetch an astroid by it\'s id', () => {
        expect(subject.getAsteroid(null, { id: 4 }, 'context')).to.deep.equal(['getNeoById', 4, 'context']);
      });
    });
  });

  describe('.AEWSAsteroidOverview', () => {
    const { AEWSAsteroidOverview: subject } = resolvers;
    describe('#miss_distance', () => {
      it('should map the value from the parent', () => {
        const data = { close_approach_data: [{ miss_distance: { kilometers: 88 } }] };
        const result = subject.miss_distance(data);
        expect(result).to.equal(88);
      });
    });

    describe('#miss_date', () => {
      it('should map the value from the parent', () => {
        const result = subject.miss_date({ close_approach_data: [{ close_approach_date: 'couple days ago' }] });
        expect(result).to.equal('couple days ago');
      });
    });

    describe('#is_dangerous', () => {
      it('should map the value from the parent', () => {
        const result = subject.is_dangerous({ is_potentially_hazardous_asteroid: 'yup' });
        expect(result).to.equal('yup');
      });
    });

    describe('#asteroid_details', () => {
      it('should map the value from the parent', () => {
        const result = subject.asteroid_details({ id: 9 }, {}, 'context');
        expect(result).to.deep.equal(['getNeoById', 9, 'context']);
      });
    });
  });

  describe('.AEWSAsteroid', () => {
    const { AEWSAsteroid: subject } = resolvers;
    const mockData = {
      orbital_data: {
        orbit_id: 'orbit_id',
        orbit_determination_date: 'orbit_determination_date',
        first_observation_date: 'first_observation_date',
        last_observation_date: 'last_observation_date',
        data_arc_in_days: 'data_arc_in_days',
        observations_used: 'observations_used',
        eccentricity: 'eccentricity',
        semi_major_axis: 'semi_major_axis',
        orbit_class: 'orbit_class',
      },
    };

    describe('#asteroid_orbit_id', () => {
      it('should map the value from the parent', () => {
        expect(subject.asteroid_orbit_id(mockData)).to.equal('orbit_id');
      });
    });

    describe('#determination_date', () => {
      it('should map the value from the parent', () => {
        expect(subject.determination_date(mockData)).to.equal('orbit_determination_date');
      });
    });

    describe('#first_observation', () => {
      it('should map the value from the parent', () => {
        expect(subject.first_observation(mockData)).to.equal('first_observation_date');
      });
    });

    describe('#last_observation', () => {
      it('should map the value from the parent', () => {
        expect(subject.last_observation(mockData)).to.equal('last_observation_date');
      });
    });

    describe('#data_arc_days', () => {
      it('should map the value from the parent', () => {
        expect(subject.data_arc_days(mockData)).to.equal('data_arc_in_days');
      });
    });

    describe('#observations', () => {
      it('should map the value from the parent', () => {
        expect(subject.observations(mockData)).to.equal('observations_used');
      });
    });

    describe('#weirdness', () => {
      it('should map the value from the parent', () => {
        expect(subject.weirdness(mockData)).to.equal('eccentricity');
      });
    });

    describe('#major_axis_semi', () => {
      it('should map the value from the parent', () => {
        expect(subject.major_axis_semi(mockData)).to.equal('semi_major_axis');
      });
    });

    describe('#class', () => {
      it('should map the value from the parent', () => {
        expect(subject.class(mockData)).to.equal('orbit_class');
      });
    });
  });

  describe('.AEWSOrbitClass', () => {
    const { AEWSOrbitClass: subject } = resolvers;
    const mockData = {
      orbit_class_type: 'crazy',
      orbit_class_range: 8,
      orbit_class_description: 'super crazy orbit',
    };

    describe('#type', () => {
      it('should map the value from the parent', () => {
        expect(subject.type(mockData)).to.equal('crazy');
      });
    });

    describe('#range', () => {
      it('should map the value from the parent', () => {
        expect(subject.range(mockData)).to.equal(8);
      });
    });

    describe('#description', () => {
      it('should map the value from the parent', () => {
        expect(subject.description(mockData)).to.equal('super crazy orbit');
      });
    });
  });
});
