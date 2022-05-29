const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/api/auth/registration', authController.registration)
router.post('/api/auth/login', authController.login)
router.delete('/api/auth/logout', authMiddleware, authController.logout)
router.delete('/api/auth/logout_all', authMiddleware, authController.logoutAll)
router.post('/api/auth/recoverytoken', authController.recoveryPasswordToken)

module.exports = router