import express = require('express')
import {RequestHandler} from 'express-serve-static-core'

import request = require('request')
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

const bindChild: RequestHandler = function(req, res, next) {
    const id = req.body.id
    const openId = (req as any).session.openId

    request({
        url: `${config.serverUrl}/bindChild`,
        method: 'POST',
        body: {
            id: id,
            openId: openId
        },
        json: true
    }, (error, response, body) => {
        if (!error) {
            res.status(response.statusCode).type('json').send(body)
        } else {
            next(error)
        }
    })
}

const getBindedChildren: RequestHandler = function(req, res, next) {
    const openId = (req as any).session.openId

    console.log('getBindedChildren')
    request({
        url: `${config.serverUrl}/user/${openId}/childs`
    }, (error, response, body) => {
        if (!error) {
            res.status(response.statusCode).type('json').send(body)
        } else {
            next(error)
        }
    })
}

router.post('/bindPhoneNumber', verifyPhoneNumber, bindPhoneNumber)
router.post('/bindChild', bindChild)
router.get('/user/childs', getBindedChildren)

export default router