const P = require('bluebird');
const { Cache: MemoryCache } = require('memory-cache');

module.exports = () => {
  const cache = new MemoryCache();

  const get = key => P.resolve(cache.get(key));
  const put = (...args) => P.resolve(cache.put(...args));
  const del = key => P.resolve(cache.del(key));
  const keys = () => P.resolve(cache.keys());
  const clear = () => P.resolve(cache.clear());

  return {
    get,
    put,
    del,
    keys,
    clear,
  };
};
