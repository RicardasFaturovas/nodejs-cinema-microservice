const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const api  = require('../api/movies')

const start = (options) => {
  return new Promise((resolve, reject) => {
    // verify if we have a repository added and a server port
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }
    // init express app, and add middlewares
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    // add our APIs to the express app
    api (app, options)

    // start the server, and return the newly created server
    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})