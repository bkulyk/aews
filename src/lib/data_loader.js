const DataLoader = require('dataloader');

function getOrCreateDataLoader(name, cb, options) {
  this.loaders = this.loaders || {};
  this.loaders[name] = this.loaders[name] || new DataLoader(cb, options);
  return this.loaders[name];
}

module.exports = {
  getOrCreateDataLoader,
};
