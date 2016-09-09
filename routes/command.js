'use strict'

const _ = require('lodash')

module.exports = (app) => {
  app.get('/snake', (req, res) => {
    if (req.query.token !== 'zRWY8EfErKj8vIYiR5Nl9i91') {
      return res.sendStatus(409)
    }

    res.json({
      response_type: 'in_channel',
      text: _.snakeCase(req.query.text)
    })
  })
}