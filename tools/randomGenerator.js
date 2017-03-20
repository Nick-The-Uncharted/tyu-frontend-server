"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomGenerator(len) {
    if (len === void 0) { len = 4; }
    return "" + Math.round(1000 + 9000 * Math.random());
}
exports.default = randomGenerator;
//# sourceMappingURL=randomGenerator.js.map