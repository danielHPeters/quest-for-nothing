"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const sassMiddleware = require("node-sass-middleware");
const socketIo = require("socket.io");
const logger_1 = require("./utils/logger");
class Server {
    constructor() {
        this.init();
    }
    static bootstrap() {
        return new Server();
    }
    init() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        const routes = require('./routes/index');
        const io = socketIo(this.httpServer);
        require('./gameLoop')(io);
        this.app.set('views', path.join(__dirname, '../../views'));
        this.app.set('view engine', 'pug');
        this.app.use(require('morgan')('dev', { 'stream': logger_1.stream }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(favicon(path.join(__dirname, '../../public/favicon/favicon.ico')));
        this.app.use(sassMiddleware({
            src: path.join(__dirname, '../../public'),
            dest: path.join(__dirname, '../../public'),
            indentedSyntax: true,
            sourceMap: true,
            outputStyle: 'compressed'
        }));
        this.app.use(express.static(path.join(__dirname, '../../public')));
        this.app.use('/', routes);
        this.app.use((req, res, next) => {
            const err = new Error('Page: ' + req.path + ' not found');
            err['status'] = 404;
            next(err);
        });
        const pages = ['Home', 'GameState', 'Controls', 'About', 'Levels'];
        if (this.app.get('env') === 'development') {
            this.app.use((err, req, res, next) => {
                console.log(err.status);
                res.status(err.status || 500);
                res.render('error', { title: '404', pages: pages, message: err.message, error: err });
            });
        }
        this.app.use((err, req, res, next) => {
            console.log(err.status);
            res.status(err.status || 500);
            res.render('error', { title: '404', pages: pages, message: err.message, error: {} });
        });
        this.app.set('port', process.env.PORT || 3000);
        this.httpServer.listen(this.app.get('port'), () => {
            logger_1.logger.log('info', 'Express remote listening on port ' + this.httpServer.address().port);
        });
    }
}
exports.Server = Server;
