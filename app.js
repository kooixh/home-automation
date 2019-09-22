let express = require('express');
let routes = require('./main/routes');
let bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;