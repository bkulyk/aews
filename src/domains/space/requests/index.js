const cache = require('../../../lib/cache');
const fetchFromNasa = require('./fetch_from_nasa');

const getNeoList = context => cache.fetch(
  ['neo', 'feed'],
  () => fetchFromNasa(context, 'feed'),
);

const getNeoById = (id, context) => cache.fetch(
  ['neo', id],
  () => fetchFromNasa(context, 'neo/{id}', { id }),
);

module.exports = {
  getNeoList,
  getNeoById,
};
