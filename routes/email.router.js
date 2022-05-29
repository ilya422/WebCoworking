const Router = require('express')
const router = new Router()
const emailController = require('../controller/email.controller')

router.post('/api/email', emailController.SendEmail)
router.post('/api/email/list', emailController.SendEmailingList)
module.exports = router