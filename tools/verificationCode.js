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
var TopClient = require('../vendor/Dayu/topClient').TopClient;
var config = require('../config.json').daYu;
var randomGenerator_1 = require("../tools/randomGenerator");
var logger = require("../tools/loggers");
var mysqlExecutor_1 = require("./mysqlExecutor");
function sendVerificationCode(phoneNumber) {
    var smsCode = randomGenerator_1.default();
    var client = new TopClient({
        'appkey': config.appId,
        'appsecret': config.appSecret,
        'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
    return new Promise(function (resolve, reject) {
        client.execute('alibaba.aliqin.fc.sms.num.send', {
            'extend': '123456',
            'sms_type': 'normal',
            'sms_free_sign_name': config.signatureName,
            'sms_param': { number: smsCode },
            'rec_num': phoneNumber,
            'sms_template_code': config.templateId
        }, function (error, response) {
            if (!error) {
                resolve(smsCode);
            }
            else {
                logger.error(error);
                reject(error);
            }
        });
    });
}
exports.sendVerificationCode = sendVerificationCode;
function persistCode(phoneNumber, smsCode) {
    return __awaiter(this, void 0, void 0, function () {
        var value, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mysqlExecutor_1.executeQuery("insert into sms value (?, ?, date_add(now(), interval 5 minute))\n                    on duplicate key update smsCode = values(smsCode), \n                    expireTime = values(expireTime)", [phoneNumber, smsCode])];
                case 1:
                    value = _a.sent();
                    logger.info("smscode:" + smsCode + " sent and saved");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger.error(error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.persistCode = persistCode;
function verifyCode(phoneNumber, smsCode) {
    return __awaiter(this, void 0, void 0, function () {
        var value, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mysqlExecutor_1.executeQuery("select * from sms where phoneNumber=? and smsCode=? and expireTime >= now() limit 1", [phoneNumber, smsCode])];
                case 1:
                    value = _a.sent();
                    if (value.length) {
                        logger.info("smscode:" + smsCode + " is valid");
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    logger.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.verifyCode = verifyCode;
//# sourceMappingURL=verificationCode.js.map