const Router = require('express')
const router = new Router()
const regCodeController = require('../controller/registration_codes.controller')

router.post('/api/regcode', regCodeController.createCode)

module.exports = router