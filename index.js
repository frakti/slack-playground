'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ok: 'test'})
})

app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')))