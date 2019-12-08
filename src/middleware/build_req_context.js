const config = require('config');
const { request } = require('../lib/request');
const { addMetaData } = require('../lib/meta');
const { getOrCreateDataLoader } = require('../lib/data_loader');

const buildReqContext = (req, _res, next) => {
  req.meta = [{ start_time: process.hrtime() }];
  req.fetch = request;
  req.debug = false;
  req.start = process.hrtime();
  req.config = config;
  req.addMetaData = addMetaData;
  req.getOrCreateDataLoader = getOrCreateDataLoader;
  next();
};

module.exports = buildReqContext;
