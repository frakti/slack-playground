'use strict'

module.exports = (app) => {

  app.get('/reverse', (req, res) => {
    res.json({
      response_type: 'in_channel',
      text: JSON.stringify(req.query)
    })
  })

}