"use strict";
var mysql = require("mysql");
var mysqlConfig = require('../config.json').mysql;
var logger = require("../tools/loggers");
(function () {
    executeQuery("create table if not exists sms (\n\t    phoneNumber char(11)  primary key,\n\t    smsCode char(4),\n\t    expireTime DATETIME)");
})();
function executeQuery(query, values) {
    if (values === void 0) { values = []; }
    logger.info({ query: query, values: values });
    return new Promise(function (resolve, reject) {
        var connection = mysql.createConnection(mysqlConfig);
        connection.connect();
        connection.query(query, values, function (err, rows) {
            if (err)
                reject(err);
            resolve(rows);
        });
        connection.end();
    });
}
exports.executeQuery = executeQuery;
//# sourceMappingURL=mysqlExecutor.js.map