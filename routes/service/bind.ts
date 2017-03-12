import express = require('express')
import {RequestHandler} from 'express-serve-static-core'

import request = require('request')
import * as log from '../../tools/loggers'
import {verifyCode} from '../../tools/verificationCode'
const config = require('../../config.json')
const router = express.Router()

import {getOpenIdFromReq} from '../../tools/openidGetter'

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
    const openid = getOpenIdFromReq(req, res)

    request({
        url: `${config.serverUrl}/reportUser/bindPhoneNumber`,
        method: 'POST',
    }, (error, response, body) => {
        log.info({
            openid: openid,
            phoneNumber: phoneNumber
        })
        log.info(body)
        if (!error) {
            res.status(response.statusCode).type('json').send(body)
            log.info(`bind openid: ${openid} with phoneNumber: ${phoneNumber}`);
        } else {
            next(error)
        }
    }).form({
        openID: openid,
        phoneNumber: phoneNumber
    })
}

const bindChild: RequestHandler = function(req, res, next) {
    const studentID = req.body.studentID
    const openid = getOpenIdFromReq(req, res)

    request({
        url: `${config.serverUrl}/reportUser/bindStudent`,
        method: 'POST'
    }, (error, response, body) => {
        if (!error) {
            res.status(response.statusCode).type('json').send(body)
        } else {
            next(error)
        }
    }).form({
        studentID: studentID,
        openID: openid
    })
}

const getBindedChildren: RequestHandler = function(req, res, next) {
    const openid = getOpenIdFromReq(req, res)

    request({
        url: `${config.serverUrl}/reportUser/searchStudentByOpenID?openID=${openid}`,
    }, (error, response, body) => {
        if (!error) {
            res.status(response.statusCode).type('json').send(body)
        } else {
            next(error)
        }
    })
}

// router.post('/reportUser/bindPhoneNumber', verifyPhoneNumber, bindPhoneNumber)
// router.post('/reportUser/bindStudent', bindChild)
router.get('/reportUser/searchStudentByOpenID', getBindedChildren)

export default router