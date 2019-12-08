const { describe, it, expect } = require('../bootstrap');
const subject = require('../../src/middleware/correlation_id');

const mockRes = {
  set: (k, v) => {
    mockRes[k] = v;
  },
};

describe('correlationIdMiddleware', () => {
  describe('correlationId', () => {
    it('should extract X-Correlation-ID from header and put it in the req context', async () => {
      const mockReq = {
        headers: { 'X-Correlation-ID': 'correlate-this' },
        correlationId: null,
      };

      await new Promise(resolve => subject(mockReq, mockRes, resolve));
      expect(mockReq.correlationId).to.equal('correlate-this');
    });

    it('should extract x-correlation-id from header and put it in the req context', async () => {
      const mockReq = {
        headers: { 'x-correlation-id': 'correlate-that' },
        correlationId: null,
      };


      await new Promise(resolve => subject(mockReq, mockRes, resolve));
      expect(mockReq.correlationId).to.equal('correlate-that');
    });

    it('should extract generate correlation id if not found in header', async () => {
      const mockReq = {
        correlationId: null,
      };

      await new Promise(resolve => subject(mockReq, mockRes, resolve));

      expect(typeof mockReq.correlationId).to.equal('string');
      expect(mockReq.correlationId.length).to.be.greaterThan(10);
    });
  });

  describe('clientId', () => {
    it('should extract x-client-id from header', async () => {
      const req = { headers: { 'x-client-id': 'some-client' } };

      await new Promise(resolve => subject(req, mockRes, resolve));

      expect(req.clientId).to.equal('some-client-graphic');
    });

    it('should extract client_id get param', async () => {
      const req = { query: { client_id: 'some-client' } };

      await new Promise(resolve => subject(req, mockRes, resolve));

      expect(req.clientId).to.equal('some-client-graphic');
    });

    it('should extract client_id from post body', async () => {
      const req = { body: { client_id: 'some-client' } };

      await new Promise(resolve => subject(req, mockRes, resolve));

      expect(req.clientId).to.equal('some-client-graphic');
    });
  });
});
