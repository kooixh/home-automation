const config = require('config');

const app = require('./src/server/app');
const port = config.port;

app.listen(port);
console.log('Express listening on port ' + port);
