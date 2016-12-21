import express = require('express')
import * as log from '../../tools/loggers'

const router = express.Router()
const TopClient = require('../../vendor/Dayu/topClient').TopClient;


router.post('/smsCode', function(req, res, next){
    const phoneNumber: string = req.query["mobilePhoneNumber"]

    var client = new TopClient({
        'appkey': 'appkey',
        'appsecret': 'secret',
        'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
 
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'sms_type':'normal',
        'sms_free_sign_name':'黄崇和',
        'rec_num':'13000000000',
        'sms_template_code':'SMS_585014'
    }, function(error, response) {
        if (!error) console.log(response);
        else console.log(error);
    })
    log.info(`send sms code to ${phoneNumber}`)
})

export default router