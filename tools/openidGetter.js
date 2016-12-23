"use strict";
var request = require("request");
var log = require("../tools/loggers");
var config = require('../config.json')["wechat"];
function getOpenidFromAuthCode(req, res, next, authCode) {
    request("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + config.appId + "&secret=" + config.appSecret + "&code=" + authCode + "&grant_type=authorization_code", function (error, response, body) {
        if (!error) {
            body = JSON.parse(body);
            req.openid = body.openid;
            log.info("openid is " + req.openid);
            next();
        }
        else {
            next(error);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOpenidFromAuthCode;
//# sourceMappingURL=openidGetter.js.map