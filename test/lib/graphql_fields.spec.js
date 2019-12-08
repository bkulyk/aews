const proxyquire = require('proxyquire').noPreserveCache();
const {
  expect,
  it,
  describe,
} = require('../bootstrap');

let stub;

const subject = proxyquire('../../src/lib/graphql_fields', {
  'graphql-fields': () => stub(),
});

describe('lib/graphql_fields', () => {
  it('should do whatever graphql fields does, but catch the exception if there was an error', async () => {
    stub = () => {
      throw new Error('my error');
    };

    const p = new Promise((resolve) => {
      resolve(subject({ some: 'data' }));
    });

    expect(p).to.eventually.deep.equal({});
  });

  it('should do whatever graphql fields does, but catch the exception if there was none', async () => {
    stub = () => 'all good';

    const p = new Promise((resolve) => {
      resolve(subject({ some: 'data' }));
    });

    expect(p).to.eventually.equal('all good');
  });
});
