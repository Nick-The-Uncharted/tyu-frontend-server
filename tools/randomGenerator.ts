import crypto = require('crypto')

export default function randomGenerator(len = 4) {
    return `Math.round(1000 + 9000 * Math.random())`
}