const { describe, it, expect } = require('../../../bootstrap');
const subject = require('../../../../src/domains/space/requests/handle_nasa_errors');

describe('domains/space/requests/handle_nasa_errors', () => {
  it('should convert 429 error into something nicer', async () => {
    try {
      await subject({ statusCode: 429 });
    } catch (e) {
      expect(e.name).to.equal('OverRateLimit');
    }
  });

  it('should convert unknown errors into something a generic nasa api error', async () => {
    try {
      await subject({ statusCode: 999 });
    } catch (e) {
      expect(e.name).to.equal('NasaAPIError');
    }
  });
});
