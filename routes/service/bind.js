"use strict";
var express = require("express");
var log = require("../../tools/loggers");
var verificationCode_1 = require("../../tools/verificationCode");
var config = require('../../config.json');
var router = express.Router();
var verifyPhoneNumber = function (req, res, next) {
    var _a = req.body, phoneNumber = _a.phoneNumber, smsCode = _a.smsCode;
    verificationCode_1.verifyCode(phoneNumber, smsCode)
        .then(function (result) {
        if (result) {
            log.info("smsCode " + smsCode + " is valid");
            next();
        }
        else {
            log.info('验证码错误');
            res.status(401).json({
                message: '验证码错误'
            });
        }
    });
};
var bindPhoneNumber = function (req, res, next) {
    var phoneNumber = req.body.phoneNumber;
    var openid = req.openid;
    log.info("bind openid: " + openid + " with phoneNumber: " + phoneNumber);
    res.json({
        "userId": 6666
    });
};
router.post('/bindPhoneNumber', verifyPhoneNumber, bindPhoneNumber);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=bind.js.map