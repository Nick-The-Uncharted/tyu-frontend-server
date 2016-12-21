import express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var history = require('connect-history-api-fallback');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import * as log from './tools/loggers'
import openidGetter from './tools/openidGetter'
import serviceRouter from './routes/service';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(history())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 测试用跨越访问
app.use(function(req, res, next) {
    const env = process.env.NODE_ENV || 'development';
    if (env == "development") {
        res.header("Access-Control-Allow-Origin", "*");
    }
    next()
})

// 用微信授权码获取openid
app.use("/", function(req, res, next) {
    log.info(req.body);
    
    if (req.body && req.body.wechatAuthCode) {
        openidGetter(req, res, next, req.body.wechatAuthCode)
    } else {
        next()
    }
})
app.use('/service', serviceRouter);

declare global {
    interface Error {
        status?: number
    }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function() {
    log.info("Big brother is listening you");
})

export = app;
