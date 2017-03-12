"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require("express");
var request = require("request");
var log = require("../../tools/loggers");
var verificationCode_1 = require("../../tools/verificationCode");
var config = require('../../config.json');
var router = express.Router();
var openidGetter_1 = require("../../tools/openidGetter");
var verifyPhoneNumber = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, phoneNumber, smsCode, result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, phoneNumber = _a.phoneNumber, smsCode = _a.smsCode;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, verificationCode_1.verifyCode(phoneNumber, smsCode)];
                case 2:
                    result = _b.sent();
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
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    if (error_1) {
                        res.status(412).json({
                            message: error_1.message
                        });
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var bindPhoneNumber = function (req, res, next) {
    var phoneNumber = req.body.phoneNumber;
    var openid = openidGetter_1.getOpenIdFromReq(req, res);
    request({
        url: config.serverUrl + "/reportUser/bindPhoneNumber",
        method: 'POST',
    }, function (error, response, body) {
        log.info({
            openid: openid,
            phoneNumber: phoneNumber
        });
        log.info(body);
        if (!error) {
            res.status(response.statusCode).type('json').send(body);
            log.info("bind openid: " + openid + " with phoneNumber: " + phoneNumber);
        }
        else {
            next(error);
        }
    }).form({
        openID: openid,
        phoneNumber: phoneNumber
    });
};
var bindChild = function (req, res, next) {
    var studentID = req.body.studentID;
    var openid = openidGetter_1.getOpenIdFromReq(req, res);
    request({
        url: config.serverUrl + "/reportUser/bindStudent",
        method: 'POST'
    }, function (error, response, body) {
        if (!error) {
            res.status(response.statusCode).type('json').send(body);
        }
        else {
            next(error);
        }
    }).form({
        studentID: studentID,
        openID: openid
    });
};
var getBindedChildren = function (req, res, next) {
    var openid = openidGetter_1.getOpenIdFromReq(req, res);
    request({
        url: config.serverUrl + "/reportUser/searchStudentByOpenID?openID=" + openid,
    }, function (error, response, body) {
        if (!error) {
            res.status(response.statusCode).type('json').send(body);
        }
        else {
            next(error);
        }
    });
};
// router.post('/reportUser/bindPhoneNumber', verifyPhoneNumber, bindPhoneNumber)
// router.post('/reportUser/bindStudent', bindChild)
router.get('/reportUser/searchStudentByOpenID', getBindedChildren);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=bind.js.map