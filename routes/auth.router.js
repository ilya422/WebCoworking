const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')

router.post('/api/auth/registration', authController.registration)
router.post('/api/auth/login', authController.login)
router.delete('/api/auth/logout', authController.logout)
router.post('/api/auth/recoverytoken', authController.recoveryPasswordToken)

module.exports = router