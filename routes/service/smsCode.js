"use strict";
var express = require("express");
var log = require("../../tools/loggers");
var verificationCode_1 = require("../../tools/verificationCode");
var router = express.Router();
router.post('/smsCode', function (req, res, next) {
    var phoneNumber = req.body["phoneNumber"];
    verificationCode_1.sendVerificationCode(phoneNumber)
        .then(function () {
        log.info("send sms code to " + phoneNumber);
        res.status(204).end();
    })
        .catch(function () {
        log.error("发送验证码失败");
        res.status(403).end();
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=smsCode.js.map