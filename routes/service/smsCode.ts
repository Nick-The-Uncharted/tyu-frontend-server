import express = require('express')
import * as log from '../../tools/loggers'
import {sendVerificationCode} from '../../tools/verificationCode'

const router = express.Router()


router.post('/smsCode', function(req, res, next){
    const phoneNumber: string = req.body["phoneNumber"]
    sendVerificationCode(phoneNumber)
        .then(function(){
            log.info(`send sms code to ${phoneNumber}`)
            res.status(204).end()
        })
        .catch(function(){
            log.error("发送验证码失败")
            res.status(403).end()
        })
})

export default router