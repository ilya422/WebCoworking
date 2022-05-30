const Router = require('express')
const router = new Router()
const serAdvController = require('../controller/service_adv.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/api/service_adv', authMiddleware, serAdvController.create_serAdv)
router.get('/api/service_adv', serAdvController.get_serAdvs)
router.get('/api/service_adv/main/:id_tag', serAdvController.get_serAdvByTag)
router.get('/api/service_adv/:id', serAdvController.getOne_serAdv)
router.get('/api/service_adv/user/p',authMiddleware, serAdvController.get_serAdvByUser)
router.put('/api/service_adv/:id', authMiddleware, serAdvController.update_serAdv)
router.delete('/api/service_adv', authMiddleware, serAdvController.delete_serAdv)

module.exports = router