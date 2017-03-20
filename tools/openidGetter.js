"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var log = require("../tools/loggers");
var config = require('../config.json')["wechat"];
var url = require('url');
function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        hostname: req.hostname,
        port: req.socket.localPort,
        pathname: req.originalUrl
    });
}
function getOpenidFromAuthCode(req, res, next, authCode) {
    request("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + config.appId + "&secret=" + config.appSecret + "&code=" + authCode + "&grant_type=authorization_code", function (error, response, body) {
        if (!error) {
            log.info("openid: " + body);
            body = JSON.parse(body);
            var env = process.env.NODE_ENV || 'development';
            req.session.openid = body.openid;
            log.info("openid is " + req.session.openid);
            next();
        }
        else {
            next(error);
        }
    });
}
exports.default = getOpenidFromAuthCode;
function redirectToGetOpenId(req, res, next) {
    log.info("redirect => " + getWechatRedirectUrl(fullUrl(req)));
    res.redirect(getWechatRedirectUrl(fullUrl(req)));
}
exports.redirectToGetOpenId = redirectToGetOpenId;
function getWechatRedirectUrl(uri) {
    var redirectUri = encodeURIComponent(uri);
    log.info("redirectUri => " + uri);
    return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + config.appId + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_base#wechat_redirect";
}
function getOpenIdFromReq(req, res) {
    return req.session.openid;
}
exports.getOpenIdFromReq = getOpenIdFromReq;
//# sourceMappingURL=openidGetter.js.map
