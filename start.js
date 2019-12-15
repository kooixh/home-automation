const config = require('config');

const app = require('./main/app');
const port = config.port;

app.listen(port);
console.log('Express listening on port ' + port);
