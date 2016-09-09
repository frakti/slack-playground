'use strict'

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ok: true})
  })

  require('./command')(app)
}