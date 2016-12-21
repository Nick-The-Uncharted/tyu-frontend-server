import express = require('express')

const router = express.Router()

import bind from './bind'
import sms from './sms'

router.use("/", bind)
router.use("/", sms)

export default router