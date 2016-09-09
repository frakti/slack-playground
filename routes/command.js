'use strict'

const _ = require('lodash')

module.exports = (app) => {
  app.get('/snake', (req, res) => {
    if (req.query.token !== process.env.SLACK_SNAKE_COMMAND_TOKEN) {
      return res.sendStatus(409)
    }

    res.json({
      response_type: 'in_channel',
      text: _.snakeCase(req.query.text)
    })
  })
}