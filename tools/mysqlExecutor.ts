import mysql = require('mysql')
const mysqlConfig = require('../config.json').mysql;

(function() {
    executeQuery(
    `create table if not exists tyu.sms (
	    phoneNumber char(11)  primary key,
	    smsCode char(4),
	    expireTime DATETIME)`
    )
})()

export function executeQuery(query: string, values: Array<any> = []): Promise<any[]> {
    return new Promise(function(resolve, reject) {
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect();
        connection.query(query, values,function(err, rows) {
            if (err) reject(err);
            resolve(rows)
        });

        connection.end();
    })
}