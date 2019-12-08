const dig = require('object-dig');
const config = require('config');
const memory = require('./memory');
const file = require('./file');

const adapters = {
  file,
  memory,
};
const adapter = adapters[dig(config, 'cache', 'adapter') || 'memory'];
const client = adapter();

const fetch = async (key, cb, time) => {
  const res = await client.get(key);
  if (!res) {
    const newValue = await cb();
    if (newValue) {
      client.put(key, newValue, time);
    }
    return newValue;
  }
  return res;
};

module.exports = {
  get: client.get,
  put: client.put,
  del: client.del,
  keys: client.keys,
  clear: client.clear,
  fetch,
};
