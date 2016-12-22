"use strict";
var crypto = require("crypto");
function randomGenerator(len) {
    if (len === void 0) { len = 4; }
    return crypto.randomBytes(Math.ceil(len * 3 / 4)).toString('base64').slice(0, len).replace(/\+|\//g, "C");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = randomGenerator;
//# sourceMappingURL=randomGenerator.js.map