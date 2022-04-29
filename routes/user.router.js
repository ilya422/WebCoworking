const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/api/user', userController.createUser)
router.get('/api/user', userController.getUsers)
router.get('/api/user/:id', userController.getOneUser)
router.put('/api/user/:id', userController.updateUser)
router.delete('/api/user/:id', userController.deleteUser)

module.exports = router