const TopClient = require('../vendor/Dayu/topClient').TopClient;
const config = require('../config.json').daYu
import randomGenerator from '../tools/randomGenerator'
import * as logger from '../tools/loggers'
import {executeQuery} from './mysqlExecutor'

export function sendVerificationCode(phoneNumber: string) {
    const smsCode = randomGenerator()
    
    var client = new TopClient({
        'appkey': config.appId,
        'appsecret': config.appSecret,
        'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
 
    return new Promise((resolve, reject) => {
        client.execute('alibaba.aliqin.fc.sms.num.send', {
            'extend': '123456',
            'sms_type':'normal',
            'sms_free_sign_name': config.signatureName,
            'sms_param': {code: smsCode, product: "体优体育"},
            'rec_num': phoneNumber,
            'sms_template_code': config.templateId
        }, function(error, response) {
            if (!error) {
                resolve(smsCode)
            } else {
                logger.error(error)
                reject(error)
            }
        })
    })
}

export async function persistCode(phoneNumber, smsCode) {
    try {
        const value = await executeQuery(`insert into sms value (?, ?, date_add(now(), interval 5 minute))
                    on duplicate key update smsCode = values(smsCode), 
                    expireTime = values(expireTime)`, [phoneNumber, smsCode])
        logger.info(`smscode:${smsCode} sent and saved`)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export async function verifyCode(phoneNumber: string, smsCode: string) {
    try {
        const value = await executeQuery(`select * from sms where phoneNumber=? and smsCode=? and expireTime >= now() limit 1`, [phoneNumber, smsCode])
        if (value.length) {
            logger.info(`smscode:${smsCode} is valid`)
            return true;
        } else {
            return false;
        }
    } catch(error) {
        logger.error(error);
    }
}