"use strict";
var express = require("express");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var history = require('connect-history-api-fallback');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');
var session = require('express-session');
var config = require('./config.json');
var log = require("./tools/loggers");
var openidGetter_1 = require("./tools/openidGetter");
var service_1 = require("./routes/service");
var helmet = require("helmet");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "whatever" }));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-eval'"] // 使用的vue standalone version， 没有用vue-loader
        }
    },
    dnsPrefetchControl: false,
    frameguard: true,
    hidePoweredBy: true,
    hpkp: false,
    hsts: true,
    ieNoOpen: true,
    noCache: false,
    noSniff: true,
    xssFilter: true
}));
// 测试用跨域访问
app.use(function (req, res, next) {
    var env = process.env.NODE_ENV || 'development';
    if (env == "development") {
        res.header("Access-Control-Allow-Origin", "*");
    }
    next();
});
// 获取code, 拿到openId
app.use("/", function (req, res, next) {
    log.info(req.query.code);
    if (req.query && req.query.code) {
        openidGetter_1.default(req, res, next, req.query.code);
    }
    else {
        next();
    }
});
app.use('/service', service_1.default);
app.use(proxy('/service', {
    target: config.serverUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/service': ''
    }
}));
app.use(express.static(path.join(__dirname, 'node_modules/tyu-wechat/dist')));
app.use(history());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(3000, function () {
    log.info("Big brother is listening you");
});
module.exports = app;
//# sourceMappingURL=app.js.map