const config = require('config');
const { graphiqlExpress } = require('apollo-server-express');
const router = require('../router');

const uiEnabled = config.get('uiEnabled');

if (uiEnabled) {
  router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}
