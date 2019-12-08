const config = require('config');
const { express: voyager } = require('graphql-voyager/middleware');
const router = require('../router');

const uiEnabled = config.get('uiEnabled');

if (uiEnabled) {
  router.use('/diagram', voyager({ endpointUrl: '/graphql' }));
}
