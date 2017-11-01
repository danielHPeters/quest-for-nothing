'use strict'

const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const sassMiddleware = require('node-sass-middleware')
const logger = require('./utils/logger') // use customized winston logger
const server = http.Server(app)
const routes = require('./routes/index') // get routes
const io = require('socket.io')(server) // integrate socket.io
require('./../game/gameLoop')(io) // pass socket io to the game loop to allow sending and receiving game status events
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(require('morgan')('dev', {'stream': logger.stream})) // pass custom logger to default express logger

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(favicon(path.join(__dirname, '../../public/favicon/favicon.ico')))
app.use(sassMiddleware({
  src: path.join(__dirname, '../../public'),
  dest: path.join(__dirname, '../../public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  outputStyle: 'compressed'
}))
app.use(express.static(path.join(__dirname, '../../public')))

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page: ' + req.path + ' not found')
  err.status = 404
  next(err)
})
const pages = ['Home', 'Game', 'Controls', 'About', 'Levels']

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    console.log(err.status)
    res.status(err.status || 500)
    res.render('error', {title: '404', pages: pages, message: err.message, error: err})
  })
}

// production error handler
// no stack traces leaked to user
app.use((err, req, res, next) => {
  console.log(err.status)
  res.status(err.status || 500)
  res.render('error', {title: '404', pages: pages, message: err.message, error: {}})
})

app.set('port', process.env.PORT || 3000)

server.listen(app.get('port'), () => {
  logger.log('info', 'Express server listening on port ' + server.address().port)
})

module.exports = server
