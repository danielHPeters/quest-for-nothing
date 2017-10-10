'use strict'

let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
let favicon = require('serve-favicon')
let logger = require('./utils/logger')

app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, '../../public/favicon/favicon.ico')))
app.use(express.static(path.join(__dirname, '../../public')))
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(require('morgan')('dev', {'stream': logger.stream}))

app.get('/', function (req, res) {
  res.redirect('/home')
})

app.get('/home', function (req, res) {
  res.render('index', {title: 'Home'})
})

app.get('/game', function (req, res) {
  res.render('game', {title: 'Game'})
})

app.get('/controls', function (req, res) {
  res.send('')
})

app.get('/about', function (req, res) {

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    console.log(err.status)
    res.status(err.status || 500)
    res.render('error', {title: 404, message: err.message, error: err})
  })
}

// production error handler
// no stack traces leaked to user
app.use(function (err, req, res) {
  console.log(err.status)
  res.status(err.status || 500)
  res.render('error', {title: 404, message: err.message, error: {}})
})

app.listen(3000, function () {
  logger.log('info', 'Server listening on port 3000.')
})
