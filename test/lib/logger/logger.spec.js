const proxyquire = require('proxyquire').noPreserveCache();
const sinon = require('sinon');
const {
  describe,
  it,
  expect,
  beforeAll,
} = require('../../bootstrap');

describe('logger', () => {
  describe('when config is provided', () => {
    const consoleSpy = sinon.spy();
    const prettyConsoleSpy = sinon.spy();
    const createLoggerSpy = sinon.spy();
    const addStreamSpy = sinon.spy();

    beforeAll(() => {
      proxyquire('../../../src/lib/logger', {
        './console_stream': consoleSpy,
        './pretty_console_stream': prettyConsoleSpy,
        config: { logger: { streams: ['prettyConsole'] } },
        bunyan: {
          createLogger: () => {
            createLoggerSpy();
            return {
              addStream: addStreamSpy,
            };
          },
        },
      });
    });

    it('should add logger streams as configured', async () => {
      // should have created pretty and elastic streams
      expect(prettyConsoleSpy.calledOnce).to.equal(true);

      // should have not created console stream
      expect(consoleSpy.calledOnce).to.equal(false);

      // should have created a logger
      expect(createLoggerSpy.calledOnce).to.equal(true);
    });
  });

  describe('when config is NOT provided', () => {
    const consoleSpy = sinon.spy();
    const prettyConsoleSpy = sinon.spy();
    const createLoggerSpy = sinon.spy();
    const addStreamSpy = sinon.spy();

    beforeAll(() => {
      proxyquire('../../../src/lib/logger', {
        './console_stream': consoleSpy,
        './pretty_console_stream': prettyConsoleSpy,
        config: { logger: { } },
        bunyan: {
          createLogger: () => {
            createLoggerSpy();
            return {
              addStream: addStreamSpy,
            };
          },
        },
      });
    });

    it('should add logger streams as configured', async () => {
      // should have not created console stream
      expect(consoleSpy.calledOnce).to.equal(true);

      // should have created a logger
      expect(createLoggerSpy.calledOnce).to.equal(true);

      // should not have added a second stream
      expect(addStreamSpy.calledOnce).to.equal(false);
    });
  });
});
