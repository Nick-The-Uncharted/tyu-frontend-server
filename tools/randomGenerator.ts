import crypto = require('crypto')

export default function randomGenerator(len = 4) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4)).toString('base64').slice(0, len).replace(/\+|\//g,"C")
}