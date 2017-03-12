import request = require('request')
import * as log from '../tools/loggers'
const config = require('../config.json')["wechat"]
var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    hostname: req.hostname,
    port: req.socket.localPort,
    pathname: req.originalUrl
  });
}

export default function getOpenidFromAuthCode(req, res, next, authCode){    
    request(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appId}&secret=${config.appSecret}&code=${authCode}&grant_type=authorization_code`,
        function(error, response, body){
            if (!error) {
                log.info(`openid: ${body}`)
                body = JSON.parse(body)
                
                const env = process.env.NODE_ENV || 'development';
                req.session.openid = body.openid

                log.info(`openid is ${req.session.openid}`);
                next()
            } else {
                next(error)
            }
        })
}

export function redirectToGetOpenId(req, res, next) {
    log.info(`redirect => ${getWechatRedirectUrl(fullUrl(req))}`)
    res.redirect(getWechatRedirectUrl(fullUrl(req)))
}

function getWechatRedirectUrl(uri): string {
    const redirectUri = encodeURIComponent(uri)
    log.info(`redirectUri => ${uri}`)
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base#wechat_redirect`
}

export function getOpenIdFromReq(req, res) {
    return req.session.openid
}