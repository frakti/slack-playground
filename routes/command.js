'use strict'

const fetch = require('node-fetch')
const fx = require('money')
const {formatNumber} = require('humanize-plus')

module.exports = (app) => {
  app.get('/exchange', (req, res) => {
    if (req.query.token !== process.env.SLACK_COMMAND_TOKEN) {
      return res.sendStatus(409)
    }

    const pattern = /([0-9.]+) (.+) to (.+)/

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
            response_type: 'in_channel', // ephemeral
            text: "Something is wrong with server providing exchange rates, please try again."
          })
        }

        return response.json()
      })
      .then(({rates}) => {
        const [, value, from, to] = pattern.exec(req.query.text)
        fx.rates = rates

        const result = fx(value)
          .from(from.toUpperCase())
          .to(to.toUpperCase())

        return res.json({
          response_type: 'in_channel', // ephemeral
          text: `${formatNumber(+result, 2)} ${from.toUpperCase()} == ${formatNumber(text, 2)} ${to.toUpperCase()}`
        })
      })
      .catch(err => {
        return res.json({
          response_type: 'in_channel', // ephemeral
          text: "Couldn't fetch rates, please try again."
        })
      })
  })
}