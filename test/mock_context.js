const config = require('config');
const { isNil } = require('ramda');
const { getOrCreateDataLoader } = require('../src/lib/data_loader');
const { request } = require('../src/lib/request');
const { addMetaData } = require('../src/lib/meta');
const logger = require('../src/lib/logger');

function mockFetch(url, options) {
  this.urlFetched = url;
  this.optionsRequested = options;
  this.callCount += 1;

  return Promise.resolve(this.data);
}

const MockContext = function MockContext(data) {
  if (!(this instanceof MockContext)) {
    return new MockContext(data);
  }

  this.clientId = 'test';
  this.data = data;
  this.meta = [];
  this.debug = false;
  this.config = config;
  this.loaders = {};
  this.urlFetched = null;
  this.optionsRequested = {};
  this.callCount = 0;
  this.getOrCreateDataLoader = getOrCreateDataLoader;
  this.fetch = (isNil(data) ? request : mockFetch);
  this.addMetaData = addMetaData;
  this.logger = logger.child();
  return this;
};

module.exports = MockContext;
