const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const recoveryMiddleware = require('../middleware/recovery_pass.middleware')

router.post('/api/user', userController.createUser)
// router.get('/api/user', userController.getUsers)
router.get('/api/user/id', authMiddleware, userController.getOneUserByID)
router.get('/api/user/email/:email', userController.getOneUserByEmail)
router.put('/api/user', authMiddleware, userController.updateUser)
router.put('/api/user/recovery/:token', recoveryMiddleware, userController.updateUserPasswordRecovery)
// router.delete('/api/user/:id', userController.deleteUser)

module.exports = router