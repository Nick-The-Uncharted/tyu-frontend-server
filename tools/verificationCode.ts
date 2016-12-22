const TopClient = require('../vendor/Dayu/topClient').TopClient;
const config = require('../config.json').daYu
import randomGenerator from '../tools/randomGenerator'
import * as logger from '../tools/loggers'
import {executeQuery} from './mysqlExecutor'

export async function sendVerificationCode(phoneNumber: string) {
    const smsCode = randomGenerator()
    
    var client = new TopClient({
        'appkey': config.appId,
        'appsecret': config.appSecret,
        'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
 
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'extend': '123456',
        'sms_type':'normal',
        'sms_free_sign_name':'黄崇和',
        'sms_param': {number: smsCode},
        'rec_num': phoneNumber,
        'sms_template_code': config.templateId
    }, function(error, response) {
        if (!error) {
            executeQuery(`insert into sms value (?, ?, date_add(now(), interval 5 minute))
                            on duplicate key update smsCode = values(smsCode), 
                            expireTime = values(expireTime)`, [phoneNumber, smsCode])
                            .then(function fulfilled(value) {
                                logger.info(`smscode:${smsCode} sent and saved`)
                            })
                            .catch(function rejected(reason) {
                                logger.error(reason)
                            })
            return smsCode
        } else {
            logger.error(error)
            throw error
        }
    })
}

export async function verifyCode(phoneNumber: string, smsCode: string) {
    executeQuery(`select * from sms where phoneNumber=? and smsCode=? limit 1`, [phoneNumber, smsCode])
                            .then(function fulfilled(value) {
                                if (value.length) {
                                    logger.info(`smscode:${smsCode} sent and saved`)
                                    return true;
                                } else {
                                    return false;
                                }
                            })
                            .catch(function rejected(reason) {
                                logger.error(reason);
                            })
}