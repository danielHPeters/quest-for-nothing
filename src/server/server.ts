import * as express from 'express'
import * as path from 'path'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as favicon from 'serve-favicon'
import * as cookieParser from 'cookie-parser'
import * as sassMiddleware from 'node-sass-middleware'
import * as socketIo from 'socket.io'
import { logger, stream } from './utils/logger'
import { Http2Server } from 'http2'
import GameLoop from './gameLoop'

export class Server {
  app: express.Application
  httpServer: Http2Server

  constructor () {
    this.init()
  }

  public static bootstrap (): Server {
    return new Server()
  }

  init () {
    this.app = express()
    this.httpServer = http.createServer(this.app)
    const routes = require('./routes/index') // get routes
    const io = socketIo(this.httpServer) // integrate socket.io
    const gameLoop = new GameLoop(io)
    gameLoop.start()
    this.app.set('views', path.join(__dirname, '../../views'))
    this.app.set('view engine', 'pug')
    this.app.use(require('morgan')('dev', { 'stream': stream })) // pass custom logger to default express logger
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(favicon(path.join(__dirname, '../../public/favicon/favicon.ico')))
    this.app.use(sassMiddleware({
      src: path.join(__dirname, '../../public'),
      dest: path.join(__dirname, '../../public'),
      indentedSyntax: true, // true = .sass and false = .scss
      sourceMap: true,
      outputStyle: 'compressed'
    }))
    this.app.use(express.static(path.join(__dirname, '../../public')))

    this.app.use('/', routes)

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      const err = new Error('Page: ' + req.path + ' not found')
      err['status'] = 404
      next(err)
    })
    const pages = ['Home', 'GameState', 'Controls', 'About', 'Levels']

    // error handlers

    // development error handler
    // will print stacktrace
    if (this.app.get('env') === 'development') {
      this.app.use((err, req, res, next) => {
        console.log(err.status)
        res.status(err.status || 500)
        res.render('error', { title: '404', pages: pages, message: err.message, error: err })
      })
    }

    // production error handler
    // no stack traces leaked to user
    this.app.use((err, req, res, next) => {
      console.log(err.status)
      res.status(err.status || 500)
      res.render('error', { title: '404', pages: pages, message: err.message, error: {} })
    })

    this.app.set('port', process.env.PORT || 3000)

    this.httpServer.listen(this.app.get('port'), () => {
      logger.log('info', 'Express server listening on port ' + this.httpServer.address().port)
    })
  }
}
