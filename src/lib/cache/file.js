const P = require('bluebird');
const { default: FileSystemCache } = require('file-system-cache');

module.exports = () => {
  const cache = FileSystemCache();

  const get = key => P.resolve(cache.get(key)).then(JSON.parse).catch(() => null);
  const put = (key, value) => P.resolve(cache.set(key, JSON.stringify(value))).catch(() => null);
  const del = key => P.resolve(cache.remove(key));
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
