import express = require('express')
import {RequestHandler} from 'express-serve-static-core'
import * as log from '../../tools/loggers'
const config = require('../../config.json')
const router = express.Router()

const verifyPhoneNumber: RequestHandler = function (req, res, next) {
    const {phoneNumber, smsCode} = req.body
    if (smsCode === 'valid') {
        log.info(`smsCode ${smsCode} is valid`);
        next()
    } else {
        log.info('验证码错误')
        res.status(401).json({
            message: '验证码错误'
        })
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