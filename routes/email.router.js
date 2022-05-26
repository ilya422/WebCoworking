const Router = require('express')
const router = new Router()
const emailController = require('../controller/email.controller')

router.post('/api/email', emailController.contact)
module.exports = router