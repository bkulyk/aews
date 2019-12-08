const router = require('../router');
require('./graphql');
require('./graphiql');
require('./diagram');
require('./health');

router.use('/', (req, res) => {
  if (req.url === '/') {
    res.send('');
  }
});
