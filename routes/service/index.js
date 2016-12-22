"use strict";
var express = require("express");
var router = express.Router();
var bind_1 = require("./bind");
var smsCode_1 = require("./smsCode");
router.use("/", bind_1.default);
router.use("/", smsCode_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=index.js.map