"use strict";
var express = require("express");
var router = express.Router();
var smsCode_1 = require("./smsCode");
// router.use("/", bind)
router.use("/", smsCode_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=index.js.map