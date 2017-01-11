import express = require('express')
import * as log from '../../tools/loggers'
import {sendVerificationCode, persistCode} from '../../tools/verificationCode'

const router = express.Router()


router.post('/smsCode', async function(req, res, next){
    const phoneNumber: string = req.body["phoneNumber"]
    try {
        const smsCode = await sendVerificationCode(phoneNumber)
        log.info(`send sms code to ${phoneNumber}`)
        await persistCode(phoneNumber, smsCode)
        log.info(`save sms code for ${phoneNumber}`)
        res.status(204).end()
    } catch (error) {
        log.error("发送验证码失败")
        res.status(403).json({message: error.message})
    }
})

export default router