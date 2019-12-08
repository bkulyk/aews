const { redirectToUi } = require('config');
const router = require('../router');
require('./graphql');
require('./graphiql');
require('./diagram');
require('./health');

router.use('/', (req, res) => {
  if (req.url === '/') {
    if (redirectToUi) {
      res.redirect('/graphiql');
    } else {
      res.send('');
    }
  }
});
