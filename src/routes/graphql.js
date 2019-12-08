const router = require('../router');
const buildReqContext = require('../middleware/build_req_context');
const graphql = require('../middleware/graphql');

router.use('/graphql', buildReqContext, graphql);
