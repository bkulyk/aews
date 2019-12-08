const cache = require('../../../lib/cache');
const fetchFromNasa = require('./fetch_from_nasa');

const getNeoList = context => cache.fetch(
  ['neo', 'feed'],
  () => fetchFromNasa(context, 'feed'),
);

// dataloader would have been good here, but I was unable to find a batch endpoint
const getNeoById = (id, context) => cache.fetch(
  ['neo', id],
  () => fetchFromNasa(context, 'neo/{id}', { id }),
);

module.exports = {
  getNeoList,
  getNeoById,
};
