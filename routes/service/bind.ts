import express = require('express')
import {RequestHandler} from 'express-serve-static-core'

import * as log from '../../tools/loggers'
import {verifyCode} from '../../tools/verificationCode'
const config = require('../../config.json')
const router = express.Router()

const verifyPhoneNumber: RequestHandler = async function (req, res, next) {
    const {phoneNumber, smsCode} = req.body

    try {
        const result = await verifyCode(phoneNumber, smsCode)
        if (result) {
            log.info(`smsCode ${smsCode} is valid`);
            next()
        } else {
            log.info('验证码错误')
            res.status(401).json({
                message: '验证码错误'
            })
        }     
    } catch (error) {
        if (error) {
            res.status(412).json({
                message: error.message
            })
        }
    }
}

const bindPhoneNumber: RequestHandler = function (req, res, next){
    const {phoneNumber} = req.body
    const openid = req.openid
    log.info(`bind openid: ${openid} with phoneNumber: ${phoneNumber}`);

    res.json({
        "userId": 6666
    })
}

router.post('/bindPhoneNumber', verifyPhoneNumber, bindPhoneNumber)

export default router