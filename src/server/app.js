const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())
app.use('/', routes)

module.exports = app
