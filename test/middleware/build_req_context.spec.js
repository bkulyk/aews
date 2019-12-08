const {
  describe,
  it,
  expect,
  beforeAll,
} = require('../bootstrap');
const subject = require('../../src/middleware/build_req_context');

describe('middleware/build_req_context', () => {
  let res;

  beforeAll(async () => {
    const req = {};
    res = await new Promise((resolve) => {
      subject(req, {}, () => resolve(req));
    });
  });

  it('should add a function to add metadata', async () => {
    expect(typeof res.addMetaData).to.equal('function');
  });

  it('should set function to use for http requests', async () => {
    expect(typeof res.fetch).to.equal('function');
  });

  it('should store a start time', async () => {
    expect(res.start[0]).to.be.greaterThan(0);
    expect(res.start[1]).to.be.greaterThan(0);
  });

  it('should add a function to get or create dataLoaders', async () => {
    expect(typeof res.getOrCreateDataLoader).to.equal('function');
  });

  it('should have a copy of the config', async () => {
    expect(res.config.client_id).to.equal('graphic');
  });
});
