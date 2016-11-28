'use strict'

const fetch = require('node-fetch')
const fx = require('money')

module.exports = (app) => {
  app.get('/exchange', (req, res) => {
    if (req.query.token !== process.env.SLACK_COMMAND_TOKEN) {
      return res.sendStatus(409)
    }

    const pattern = /([0-1.]+) (.+) to (.+)/

    if (!pattern.test(req.query.text)) {
      return res.json({
        response_type: 'in_channel',
        text: 'Wrong pattern, try something like: _10 usd to pln_'
      })
    }

    fetch('http://api.fixer.io/latest')
      .then(response => {
        if (!response.ok) {
          return res.json({
            response_type: 'in_channel',
            text: "Something is wrong with server providing exchange rates, please try again."
          })
        }

        return response.json()
      })
      .then(({rates}) => {
        const [, value, from, to] = pattern.exec(req.query.text)
        fx.rates = rates

        const text = fx(value)
          .from(from.toUpperCase())
          .to(to.toUpperCase())

        return res.json({
          response_type: 'in_channel',
          text
        })
      })
      .catch(err => {
        return res.json({
          response_type: 'in_channel',
          text: "Couldn't fetch rates, please try again."
        })
      })
  })
}