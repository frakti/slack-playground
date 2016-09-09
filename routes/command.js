'use strict'

module.exports = (app) => {

  app.get('/reverse', (req, res) => {
    res.json(req.query)
  })

}