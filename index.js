'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const bot = require('./bot')
const app = express()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json())

routes(app)
bot()

app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')))