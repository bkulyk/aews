const proxyquire = require('proxyquire').noPreserveCache();
const { describe, it, expect } = require('../../bootstrap');

const resolvers = proxyquire(
  '../../../src/domains/space/resolvers',
  {
    './requests': {
      getNeoList: (...args) => (['getNeoList', ...args]),
      getNeoById: (...args) => (['getNeoById', ...args]),
    },
  },
);

describe('space/resolvers', () => {
  describe('.Query', () => {
    const { Query: subject } = resolvers;
    describe('#getNearEarthObjects', () => {
      it('should call call getNeoList', async () => {
        const result = subject.getNearEarthObjects(null, null, 'context');
        expect(result).to.deep.equal(['getNeoList', 'context']);
      });
    });

    describe('#getNearEarthObjectById', () => {
      it('should call call getNeoList', async () => {
        const result = subject.getNearEarthObjectById(null, { id: 8 }, 'context');
        expect(result).to.deep.equal(['getNeoById', 8, 'context']);
      });
    });
  });

  describe('.NearEarthObjectPage', () => {
    const { NearEarthObjectPage: subject } = resolvers;
    const mockNeoPage = {
      nearEarthObjects: {
        today: ['one', 'two'],
        tomorrow: ['three'],
      },
      links: { prev: 'prev', next: 'next' },
      elementCount: 99,
    };

    describe('#nodes', () => {
      it('should get the list of nodes', () => {
        expect(subject.nodes(mockNeoPage)).to.deep.equal(['one', 'two', 'three']);
      });
    });

    describe('#pageInfo', () => {
      it('should get links and count', () => {
        expect(subject.pageInfo(mockNeoPage)).to.deep.equal({
          prev: 'prev',
          next: 'next',
          count: 99,
        });
      });
    });
  });

  describe('.NearEarthObjectSummary', () => {
    const { NearEarthObjectSummary: subject } = resolvers;
    const context = 'context';

    describe('#nearEarthObject', () => {
      it('should get the neo for the parents id', () => {
        expect(subject.nearEarthObject({ id: 44 }, null, context)).to.deep.equal([
          'getNeoById',
          44,
          'context',
        ])
      });
    });
  });
});
