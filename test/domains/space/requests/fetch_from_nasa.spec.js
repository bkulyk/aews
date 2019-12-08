const nock = require('nock');
const { describe, it, expect } = require('../../../bootstrap');
const subject = require('../../../../src/domains/space/requests/fetch_from_nasa');
const MockContext = require('../../../mock_context');

describe('domains/space/requests/fetch_from_nasa', () => {
  const context = new MockContext();

  const nasa = nock('https://api.nasa.gov');
  nasa.get('/neo/rest/v1/feed?api_key=DEMO_KEY').reply(200, '{ "mock_data": "mock_value" }');
  nasa.get('/neo/rest/v1/neo/4?api_key=DEMO_KEY').reply(200, '{ "mock_data": "neo 4" }');

  it('should fetch data from the nasa api', async () => {
    const { mock_data: result } = await subject(context, 'feed');
    expect(result).to.equal('mock_value');
  });

  it('should allow path parameters', async () => {
    const { mock_data: result } = await subject(context, 'neo/{someId}', { someId: 4 });
    expect(result).to.equal('neo 4');
  });
});
