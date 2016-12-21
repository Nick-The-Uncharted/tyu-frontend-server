"use strict";
var express = require("express");
var log = require("../../tools/loggers");
var router = express.Router();
router.post('/sms', function (req, res, next) {
    var phoneNumber = req.query["mobilePhoneNumber"];
    log.info("send sms code to " + phoneNumber);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=sms.js.map